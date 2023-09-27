import {
  ic,
  nat64,
  Opt,
  Record,
  Result,
  StableBTreeMap,
  Vec,
  match,
  $query,
  $update,
} from "azle";
import { v4 as uuidv4 } from "uuid";

// Define the Message type

type Entry = Record<{
  id: string;
  author: string;
  title: string;
  body: string;
  // cost: number;
  createdAt: nat64;
  updatedAt: Opt<nat64>;
  action: string;
  rewardPoints: number;
}>;

type EntryPayload = Record<{
  author: string;
  title: string;
  body: string;
  action: string;
  rewardPoints: number;
}>;
type RedeemableReward = Record<{
  title: string;
  cost: number;
  action: string;
}>;
type RedeemableRewardPayload = Record<{
  title: string;
  action: string;
  points: number;
}>;

const entryStorage = new StableBTreeMap<string, Entry>(0, 44, 1024);
// CRUD Functions

// Create a new entry
$update;
export function createEntry(payload: EntryPayload): Result<Entry, string> {
  // Validate the payload before processing it
  if (
    !payload.author ||
    !payload.title ||
    !payload.action ||
    !payload.body ||
    !payload.rewardPoints
  ) {
    return Result.Err<Entry, string>("Invalid payload");
  }

  const entry: Entry = {
    id: uuidv4(),
    author: payload.author,
    title: payload.title,
    body: payload.body,
    action: payload.action,
    createdAt: ic.time(),
    updatedAt: Opt.None,
    rewardPoints: payload.rewardPoints,
  };

  // switch (entry.action) {
  //   case "New":
  //     entry.rewardPoints = 100;
  //     break;
  //   default:
  //     entry.rewardPoints = 50;
  //     break;
  // }

  entryStorage.insert(entry.id, entry);

  return Result.Ok(entry);
}

// Read an entry by ID
$query;
export function readEntry(id: string): Result<Entry, string> {
  try {
    return match(entryStorage.get(id), {
      Some: (entry) => Result.Ok<Entry, string>(entry),
      None: () => Result.Err<Entry, string>(`Entry with id=${id} not found`),
    });
  } catch (error) {
    return Result.Err<Entry, string>(
      `an error occurred while reading entry with id=${id}`
    );
  }
}

// Update an existing entry's content and timestamp
$update;
export function updateEntry(
  id: string,
  payload: EntryPayload
): Result<Entry, string> {
  // Validate the payload before processing it
  if (
    !payload.author ||
    !payload.title ||
    !payload.action ||
    !payload.body ||
    !payload.rewardPoints
  ) {
    return Result.Err<Entry, string>("Invalid payload");
  }

  try {
    return match(entryStorage.get(id), {
      Some: (entry) => {
        const updatedEntry: Entry = {
          ...entry,
          ...payload,
          updatedAt: Opt.Some(ic.time()),
        };
        entryStorage.insert(entry.id, updatedEntry);
        return Result.Ok<Entry, string>(updatedEntry);
      },
      None: () => {
        return Result.Err<Entry, string>(
          `Could not update a message with id=${id}. Entry not found`
        );
      },
    });
  } catch (error) {
    return Result.Err<Entry, string>(
      `an error occurred while updating entry with id=${id}`
    );
  }
}

// Delete an entry by ID
$update;
export function deleteEntry(id: string): Result<Entry, string> {
  try {
    return match(entryStorage.remove(id), {
      Some: (deletedEntry) => Result.Ok<Entry, string>(deletedEntry),
      None: () =>
        Result.Err<Entry, string>(
          `couldn't delete entry with id=${id}. Entry not found.`
        ),
    });
  } catch (error) {
    return Result.Err<Entry, string>(
      `An error occurred while deleting the entry with id=${id}. Error: ${error}`
    );
  }
}

// // Function to reward an entry
// $update;
// export function rewardMessage(id: string, points: nat64): Result<Entry, string> {
//   return match(entryStorage.get(id), {
//     Some: (entry) => {
//       const updatedEntry: Entry = {
//         ...entry,
//         rewardPoints: (entry.rewardPoints + parseInt(points)),
//       };
//       entryStorage.insert(id, updatedEntry);
//       return Result.Ok(null);
//     },
//     None: () => Result.Err("Message not found"),
//   });
// }

// Function to get entries with their reward points
$query;
export function getEntriesWithRewards(): Result<Vec<Entry>, string> {
  try {
    return Result.Ok(entryStorage.values());
  } catch (error) {
    return Result.Err(`An error occurred: ${error}`);
  }
}

$query;
export function getRedeemableRewards(
  rewardPoints: string
): Result<Vec<Entry>, string> {
  const matchingEntries = entryStorage
    .values()
    .filter((entry) => entry.rewardPoints.toString() === rewardPoints);
  if (matchingEntries.length > 0) {
    return Result.Ok<Vec<Entry>, string>(matchingEntries);
  } else {
    return Result.Err<Vec<Entry>, string>(
      `Could not find any entries with the ${rewardPoints}. Entries not found`
    );
  }
}

type MessagePayload = Record<{
  title: string;
  body: string;
}>;

globalThis.crypto = {
  //@ts-ignore
  getRandomValues: () => {
    let array = new Uint8Array(32);

    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }

    return array;
  },
};
