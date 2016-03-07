var azure = require('azure-storage');
var nconf = require('nconf');
var uuid = require('node-uuid');
var fs = require('fs');

nconf.env()
     .file({ file: 'config/config.json'});
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

app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({limit: '1mb', extended: true}));

//bodyParser.json({limit: '900kb'});
app.use(bodyParser.urlencoded({ extended: true, limit: '500kb' }));
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'public')));
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

var TaskList = require('./routes/tasklist');
var Task = require('./models/task');
var task = new Task(azure.createTableService(accountName, accountKey), tableName, partitionKey);
var taskList = new TaskList(task);

app.get('/', taskList.showTasks.bind(taskList));
app.post('/addtask', taskList.addTask.bind(taskList));
app.post('/completetask', taskList.completeTask.bind(taskList));


process.once('SIGUSR2', function () {
  gracefulShutdown(function () {
    console.log(this);
  });
});

var tname = uuid();
fs.writeFile('public/2.txt', tname, function(){});


var blobSvc = azure.createBlobService();
blobSvc.createContainerIfNotExists('vhds', function(error, result, response){
  if(!error){
  }
});
var saveScore = function(req, res){
    console.log(req.body.item.length);
    var imageBuffer = req.body.item;
    var name = uuid();
    fs.writeFile('public/1.txt', name, function(){});
    var decodedImage = new Buffer(imageBuffer, 'base64');

    fs.writeFile(name+'.txt', imageBuffer, function(){});
    fs.writeFile(name+'.png', decodedImage, function(err) {
        if(err){}
        else{
            blobSvc.createBlockBlobFromLocalFile('vhds', name, name+".png", function(error, result, response){
            if(!error){
                console.log(result); 
                console.log(response);
            }
            });
        }
    });
    
     
    
}


app.post('/savescore', saveScore);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
