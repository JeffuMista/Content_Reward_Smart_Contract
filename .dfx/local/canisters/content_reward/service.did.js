export const idlFactory = ({ IDL }) => {
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
  const _AzleResult_1 = IDL.Variant({
    'Ok' : IDL.Vec(Entry),
    'Err' : IDL.Text,
  });
  const EntryPayload = IDL.Record({
    'title' : IDL.Text,
    'action' : IDL.Text,
    'body' : IDL.Text,
    'rewardPoints' : IDL.Float64,
    'author' : IDL.Text,
  });
  return IDL.Service({
    'createEntry' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Float64],
        [_AzleResult],
        [],
      ),
    'deleteEntry' : IDL.Func([IDL.Text], [_AzleResult], []),
    'getEntriesWithRewards' : IDL.Func([], [_AzleResult_1], ['query']),
    'getRedeemableRewards' : IDL.Func([IDL.Text], [_AzleResult], ['query']),
    'readEntry' : IDL.Func([IDL.Text], [_AzleResult], ['query']),
    'updateEntry' : IDL.Func([IDL.Text, EntryPayload], [_AzleResult], []),
  });
};
export const init = ({ IDL }) => { return []; };
