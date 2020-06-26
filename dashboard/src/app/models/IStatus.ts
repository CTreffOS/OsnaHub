import { IPoll } from './IPoll';

export interface IStatus {
  id: string;
  created_at: string;
  sensitive: boolean;
  visibility: string;
  language: string;
  uri: string;
  url: string;
  content: string;
  poll: IPoll;
}
