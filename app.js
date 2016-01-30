var azure = require('azure-storage');
var nconf = require('nconf');
var uuid = require('node-uuid');

nconf.env()
     .file({ file: 'config.json'});
var tableName = nconf.get("TABLE_NAME");
var partitionKey = nconf.get("PARTITION_KEY");
var accountName = nconf.get("STORAGE_NAME");
var accountKey = nconf.get("STORAGE_KEY");


var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

process.env.AZURE_STORAGE_ACCOUNT= "portalvhdsj3jbsdtnl15dr";
process.env.AZURE_STORAGE_ACCESS_KEY = "yvTvyKONw71W5dgbxNHpqOS9hWzzBSps93Q2sGZyxUnNFv1WfimA+MVqOiyD+RresaR6ae2Dma4HozqHgPi6sw==";
process.env.AZURE_STORAGE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=portalvhdsj3jbsdtnl15dr;AccountKey=yvTvyKONw71W5dgbxNHpqOS9hWzzBSps93Q2sGZyxUnNFv1WfimA+MVqOiyD+RresaR6ae2Dma4HozqHgPi6sw==";


// all environments
app.set('port', process.env.PORT || 3000);

bodyParser.json({limit: '500kb'});
app.use(bodyParser.urlencoded({ extended: true, limit: '500kb' }));
app.use(express.static(path.join(__dirname, 'public')));
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

var TaskList = require('./routes/tasklist');
var Task = require('./models/task');
var task = new Task(azure.createTableService(accountName, accountKey), tableName, partitionKey);
var taskList = new TaskList(task);

app.get('/', taskList.showTasks.bind(taskList));
app.post('/addtask', taskList.addTask.bind(taskList));
app.post('/completetask', taskList.completeTask.bind(taskList));

var retryOperations = new azure.ExponentialRetryPolicyFilter();
var blobSvc = azure.createBlobService();
blobSvc.createContainerIfNotExists('vhds', function(error, result, response){
  if(!error){
    // Container exists and allows
    // anonymous read access to blob
    // content and metadata within this container
  }
});
blobSvc.createBlockBlobFromLocalFile('vhds', uuid(), 'gsv1.txt', function(error, result, response){
  if(!error){
    console.log(result); 
    console.log(response);
  }
}); 

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
