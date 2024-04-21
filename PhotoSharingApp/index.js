require('dotenv').config()

const {BlobServiceClient} = require("@azure/storage-blob")

const storageAccountConnectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const blobServiceClient = BlobServiceClient.fromConnectionString(storageAccountConnectionString);

//the client won't attempt to connect to Azure until an operation is invoked that requires it.
//The client object is a lightweight object enabling access to the Azure blob storage;
// it doesn't validate the connection or the access key beingf used.



async function main() {
    const containerName = "photos";
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const containerExists = await containerClient.exists();

    if (!containerExists) {
        const createContainerResponse = await containerClient.createIfNotExists();
        console.log(`Container ${containerName} created successfully`);
    }else {
        console.log(`Container ${containerName} already exists`);
    }
}


main()