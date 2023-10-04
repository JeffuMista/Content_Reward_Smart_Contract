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
  createdAt: nat64;
  updatedAt: Opt<nat64>;
  action: string;
  rewardPoints: number;
}>;

type EntryPayload = Record<{
  author: string;
  title: string;
  body: string;
}>;
type UpdatePayload = Record<{
  body: string
}>;
type RedeemableReward = Record<{
  id: string;
  title: string;
  author: string;
  rewardPoints: number;
}>;
type RedeemableRewardPayload = Record<{
  id: string;
  title: string;
  author: string;
  rewardPoints: number;
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
    !payload.body 
  ) {
    return Result.Err<Entry, string>
    ("Invalid entry. Please fill in the provided fields");
  }

  const entry: Entry = {
    id: uuidv4(),
    author: payload.author,
    title: payload.title,
    body: payload.body,
    action: "New Entry",
    createdAt: ic.time(),
    updatedAt: Opt.None,
    rewardPoints: 100,
  };

  entryStorage.insert(entry.id, entry);

  return Result.Ok(entry);
}

// Read an entry by ID
$query;
export function readEntry(id: string): Result<Entry, string> {
  try {
    return match(entryStorage.get(id), {
      Some: (entry) => Result.Ok<Entry, string>(entry),
      None: () => Result.Err<Entry, string>
      (`Entry not found. Please enter the correct ID`),
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
  payload2: UpdatePayload,
): Result<Entry, string> {
  // Validate the payload before processing it
  if (
    !payload2.body
  ) 
    return match(entryStorage.get(id), {
      Some: (entry) => {
    const unchangedEntry : Entry = {
      ...entry,
      ...payload2,
      author: entry.author,
      action: `Entry ${id} Not Updated`,
      title: entry.title,
      body: entry.body,
      rewardPoints: entry.rewardPoints
    };
    entryStorage.insert(entry.id, unchangedEntry)
    return Result.Ok<Entry, string> (unchangedEntry)
      },
      None: () => {
    return Result.Err<Entry, string>
    (`Could not update a message. Please provide the entry ID and update the body/content field`)
  }
});
// Validate the payload before processing it
    if (
      payload2.body 
    )
    return match(entryStorage.get(id), {
      Some: (entry) => {
        const updatedEntry: Entry = {
          ...entry,
          ...payload2,
          action: `Entry ${id} Updated`,
          updatedAt: Opt.Some(ic.time()),
          rewardPoints: entry.rewardPoints + 50,
          author: entry.author,
          title: entry.title
        };
        // 
        entryStorage.insert(entry.id, updatedEntry);
        
        return Result.Ok<Entry, string>(updatedEntry);
      },
      None: () => {
        return Result.Err<Entry, string>(
          `Could not update a message. Please provide the entry ID and update the content/body field`
        );
      },
    });
   else  {
    return Result.Err<Entry, string>(
      `an error occurred while updating entry. Make sure you include the entry ID and only make changes to the content/body field`
    );
  }
};

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
  } 
  catch (error) {
    return Result.Err<Entry, string>(
      `Entry not found. Please enter the correct ID}`
    );
  }
}

$query;
export function getEntriesWithRewards(): Result<Vec<Entry>, string> {
  try {
    return Result.Ok(entryStorage.values());
  } 
  catch (error) {
    return Result.Err(`An error occurred: ${error}`);
  }
};

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

