var azure = require('azure-storage');
var fileService = azure.createFileService();

module.exports = fileStorage;

function fileStorage(storageClient){
    this.storageClient = storageClient;
    this.storageClient.createShareIfNotExists('taskshare', function(error, result, response) {
        if (!error) {
            throw error;
        }
    });
}

