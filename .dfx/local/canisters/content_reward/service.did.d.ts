import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Entry {
  'id' : string,
  'title' : string,
  'action' : string,
  'body' : string,
  'createdAt' : bigint,
  'rewardPoints' : number,
  'author' : string,
  'updatedAt' : [] | [bigint],
}
export interface EntryPayload {
  'title' : string,
  'body' : string,
  'author' : string,
}
export interface UpdatePayload { 'body' : string }
export type _AzleResult = { 'Ok' : Entry } |
  { 'Err' : string };
export type _AzleResult_1 = { 'Ok' : number } |
  { 'Err' : string };
export type _AzleResult_2 = { 'Ok' : Array<Entry> } |
  { 'Err' : string };
export interface _SERVICE {
  'createEntry' : ActorMethod<[EntryPayload], _AzleResult>,
  'deleteEntry' : ActorMethod<[string], _AzleResult>,
  'entriesWithRewardsLength' : ActorMethod<[], _AzleResult_1>,
  'getEntriesWithRewards' : ActorMethod<[], _AzleResult_2>,
  'readEntry' : ActorMethod<[string], _AzleResult>,
  'updateEntry' : ActorMethod<[string, UpdatePayload], _AzleResult>,
}
