export const idlFactory = ({ IDL }) => {
  const EntryPayload = IDL.Record({
    'title' : IDL.Text,
    'body' : IDL.Text,
    'author' : IDL.Text,
  });
  const Entry = IDL.Record({
    'id' : IDL.Text,
    'title' : IDL.Text,
    'action' : IDL.Text,
    'body' : IDL.Text,
    'createdAt' : IDL.Nat64,
    'rewardPoints' : IDL.Float64,
    'author' : IDL.Text,
    'updatedAt' : IDL.Opt(IDL.Nat64),
  });
  const _AzleResult = IDL.Variant({ 'Ok' : Entry, 'Err' : IDL.Text });
  const _AzleResult_1 = IDL.Variant({ 'Ok' : IDL.Float64, 'Err' : IDL.Text });
  const _AzleResult_2 = IDL.Variant({
    'Ok' : IDL.Vec(Entry),
    'Err' : IDL.Text,
  });
  const UpdatePayload = IDL.Record({ 'body' : IDL.Text });
  return IDL.Service({
    'createEntry' : IDL.Func([EntryPayload], [_AzleResult], []),
    'deleteEntry' : IDL.Func([IDL.Text], [_AzleResult], []),
    'entriesWithRewardsLength' : IDL.Func([], [_AzleResult_1], ['query']),
    'getEntriesWithRewards' : IDL.Func([], [_AzleResult_2], ['query']),
    'readEntry' : IDL.Func([IDL.Text], [_AzleResult], ['query']),
    'updateEntry' : IDL.Func([IDL.Text, UpdatePayload], [_AzleResult], []),
  });
};
export const init = ({ IDL }) => { return []; };
