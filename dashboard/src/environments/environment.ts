// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrls: {
    bahn: 'https://marudor.de/api/iris/v1/',
    mastodon: 'https://osna.social/api/v1/',
    trash: 'https://geo.osnabrueck.de/osb-service/abfuhrkalender/',
    bus: 'http://localhost:5000/'
  },
  mastodonAccounts: {
    ris: 756,
    risDecisions: 770
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
