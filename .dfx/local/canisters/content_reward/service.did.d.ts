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
  'action' : string,
  'body' : string,
  'rewardPoints' : number,
  'author' : string,
}
export type _AzleResult = { 'Ok' : Entry } |
  { 'Err' : string };
export type _AzleResult_1 = { 'Ok' : Array<Entry> } |
  { 'Err' : string };
export interface _SERVICE {
  'createEntry' : ActorMethod<
    [string, string, string, string, number],
    _AzleResult
  >,
  'deleteEntry' : ActorMethod<[string], _AzleResult>,
  'getEntriesWithRewards' : ActorMethod<[], _AzleResult_1>,
  'getRedeemableRewards' : ActorMethod<[string], _AzleResult>,
  'readEntry' : ActorMethod<[string], _AzleResult>,
  'updateEntry' : ActorMethod<[string, EntryPayload], _AzleResult>,
}
