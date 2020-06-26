"""
*Bus station departure table api grabber for Osnabrück VOS bus services*

This scripts takes an bus station search string as arguements and plots the current departure times for that station
It may also work on other public transport platforms that are using the HAFAS API

author: Eric Lanfer <elanfer@chaostreff-osnabrueck.de>
license: GPLv3.0
"""

import sys
import json
import requests
import prettytable

# API Endpoint
url = 'https://fahrplan.vos.info/bin/mgate.exe'


# Check program arguments
if len(sys.argv) == 3:
    ncols = sys.argv[2]
elif len(sys.argv) == 2:
    ncols = '15'
else:
    print('USAGE: get_departures.py STATION TABLELENGTH(default: 15)')

# use search string from arguments to query the api for the correct station identifier
station_query = sys.argv[1]

payload = json.loads('{"id":"zugcwvduies3y4cc","ver":"1.32","lang":"deu","auth":{"type":"AID","aid":"PnYowCQP7Tp1V"},"client":{"id":"SWO","type":"WEB","name":"webapp","l":"vs_swo"},"formatted":false,"svcReqL":[{"req":{"input":{"field":"S","loc":{"name":"Osnabrück '+ station_query +'?","type":"S","dist":1000},"maxLoc":1}},"meth":"LocMatch","id":"1|6|"}]}')
headers = {
  'Content-Type': 'application/json'
}
response = requests.request("POST", url, headers=headers, data = json.dumps(payload))
station_query_results = json.loads(response.text.encode('utf8'))

# throw an error if we do not have any stations found
if len(station_query_results['svcResL'][0]['res']['match']['locL']) != 1:
    print('ERROR: No station was found in Osnabrück for your search string!')
    exit(1)

station_lid = station_query_results['svcResL'][0]['res']['match']['locL'][0]['lid']
station_name = station_query_results['svcResL'][0]['res']['match']['locL'][0]['name']

# Query departure times
payload = json.loads('{"id":"nsk88vbu226fy6c4","ver":"1.32","lang":"deu","auth":{"type":"AID","aid":"PnYowCQP7Tp1V"},"client":{"id":"SWO","type":"WEB","name":"webapp","l":"vs_swo"},"formatted":false,"svcReqL":[{"req":{"stbLoc":{"name":"Osnabrück Kalkhügel","lid":"'+ station_lid +'"},"jnyFltrL":[{"type":"PROD","mode":"INC","value":1023}],"type":"DEP","sort":"PT","maxJny":'+ ncols +'},"meth":"StationBoard","id":"1|9|"}]}')
headers = {
  'Content-Type': 'application/json'
}
response = requests.request("POST", url, headers=headers, data = json.dumps(payload))
json_data = json.loads(response.text.encode('utf8'))

print('Departure times for ' + station_name)

table = prettytable.PrettyTable()
table.field_names = ['Line', 'Destination', 'Departure time', 'Delay', 'Information']
table.align = 'l'

# itereate over all departures
for i, item in enumerate(json_data['svcResL'][0]['res']['jnyL']):
    # prodX is used as the foreign key for the departure and references to the array position in producs (bus lines)
    line = json_data['svcResL'][0]['res']['common']['prodL'][item['prodL'][0]['prodX']]['name']
    destination = item['dirTxt']
    # parse departure time
    departure = item['stbStop']['dTimeS'][0:2] + ':' + item['stbStop']['dTimeS'][2:4]
    delay = 0
    
    # check if there are any warnings
    messages_array = []
    if 'himIdL' in json_data['svcResL'][0]['res']['common']['prodL'][item['prodL'][0]['prodX']].keys():
        # iterate over all available warnings for the product/line and check if we have a custom text for that
        for msg_id in json_data['svcResL'][0]['res']['common']['prodL'][item['prodL'][0]['prodX']]['himIdL']:
            for message in json_data['svcResL'][0]['res']['common']['himL']:
                # the warning id is not just an id, it begins with HIM_FREETEXT_ so we have to split it to get the integer value
                if int(message['hid']) == int(msg_id.split('_')[2]):
                    # print short title, long version is in field text
                    messages_array.append(message['head'])
                    # print('  ' + message['text'])
    table.add_row([line, destination, departure, delay, messages_array])
print(table)