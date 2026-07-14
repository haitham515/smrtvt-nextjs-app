import { CosmosClient } from "@azure/cosmos";

const client = new CosmosClient(process.env.COSMOS_CONNECTION_STRING!)
const database = client.database(process.env.COSMOS_DATABASE_ID!)
const container = database.container(process.env.COSMOS_COLLECTION_ID!)
// Le ! est le non-null assertion operator — tu dis à TypeScript :
// "Je garantis que cette valeur n'est pas undefined au runtime, fais-moi confiance."

export { client, database, container }