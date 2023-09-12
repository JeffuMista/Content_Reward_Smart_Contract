# Content_Reward_Smart_Contract
Content Reward Smart Contract
This smart contract, developed using the Azle language framework, enables users to manage content, including creating, reading, updating, and deleting entries. Additionally, it allows for rewarding messages with points and redeeming rewards.

Functions
Create Entry
createEntry(title: string, body: string, rewardPoints: nat64): Result<Entry, string>
Creates a new entry with the provided title, body, and initial rewardPoints. Returns the created entry if successful, or an error entry.

Read Entry
readEntry(id: string): Result<Entry, string>
Retrieves a Entry by its unique id. Returns the entry if found, or an error entry if the entry does not exist.

Update Entry
updateEntry(id: string, title: string, body: string): Result<Entry, string>
Updates the title and body of an existing entry identified by id. Returns the updated entry if successful, or an error entry if the entry does not exist.

Update Reward Points
updateRewardPoints(id: string, rewardPoints: nat64): Result<Entry, string>
Updates the rewardPoints of an existing entry identified by id. Returns the updated entry if successful, or an error entry if the entry does not exist.

Delete Entry
deleteEntry(id: string): Result<Entry, string>
Deletes a entry by its unique id. Returns an error entry if the entry does not exist or null if the deletion was successful.

Reward Entry
rewardEntry(id: string, points: nat64): Result<Entry, string>
Rewards a entry with additional points. Returns an error entry if the entry does not exist or null if the reward was successful.

Get Entries with Rewards
getEntriesWithRewards(): Result<Vec<Entry>, string>
Retrieves a list of Entries along with their reward points. Returns a vector of Entries or an error Entry.

Get Redeemable Rewards
getRedeemableRewards(): Result<Vec<RedeemableReward>, null>
Retrieves a list of available redeemable rewards. Returns a vector of redeemable rewards or null if no rewards are available.

Redeem Reward
redeemReward(action: string): Result<null, string>
Redeems a reward specified by action. Returns null if successful or an error entry if the reward is not found or there are insufficient points.

Usage
To interact with this smart contract, you can use the DFINITY SDK or Internet Computer's web-based interface. Deploy the smart contract, and then create a user interface for your application to call these functions.

License
This smart contract is open-source software released under the MIT License. Feel free to modify and use it for your own projects.
