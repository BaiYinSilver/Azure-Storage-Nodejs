var azure = require('azure-storage');
var fileService = azure.createFileService();

module.exports = fileStorage;

function fileStorage(){
    this.storageClient
}

fileService.createShareIfNotExists('taskshare', function(error, result, response) {
  if (!error) {
    // if result = true, share was created.
    // if result = false, share already existed.
  }
});