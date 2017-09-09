fs = require('fs');
url = require("url");
var view = require('./layout.js');
var publicFile = require('./public_file.js');

function getURL(request_url){
  var pathname = url.parse(request_url).pathname
  return pathname.split("/");
}

function show(response, data){

  var headers = [];
  headers["Content-Type"] = "text/plain"
  response.writeHead(200, headers);
  response.write(view(data));
  response.end();
}

function getQuery(request){
  var query = require("querystring");
  return query.parse(request.url.split("?")[1]);
}

function route(route, app ,callback){
  if(route==app.query.route){
    callback(app)
  }
}

function saveFile(name, content){

  try{
    fs.writeFileSync(name, content);
  }catch(e){
    console.log(e);
  }
}



function action(app){
  app.action = function(action, file){

  }
  return app;
}

var tid = 1;
function getDate(){

  var d = (new Date()).getDate() > 9 ? (new Date()).getHours() : '0'+(new Date()).getHours();
  var m = (new Date()).getMonth() > 9 ? (new Date()).getMonth(): '0'+(new Date()).getMonth();
  var y = (new Date()).getFullYear();
  var ho = (new Date()).getHours() > 9 ? (new Date()).getHours() : '0'+(new Date()).getHours();
  var mi = (new Date()).getMinutes() > 9 ? (new Date()).getMinutes() : '0'+(new Date()).getMinutes();
  var se = (new Date()).getSeconds() > 9 ? (new Date()).getSeconds() :'0'+(new Date()).getSeconds();
  var name = y+m+d+ho+mi+se;
  return name;
}

function saveTransaction(app){
  var t = tid++;
  var filedate = getDate();
  app.query.created_at = filedate;
  saveFile('transaction/'+filedate+'-'+t+'.js', JSON.stringify(app.query, null, 4));
}

function loadDB(folder)
{
  try{
    var db={};
    var list = fs.readdirSync(folder)
    for(i in list){
      var item = list[i];
      var content = fs.readFileSync(folder+'/'+item, "utf8");
      var file = JSON.parse(content);
      var name = item.replace('.js','')
      db[name] = file;
      return db;
    }
  }catch(e){
    console.log(e)
  }
}

var db = loadDB('content');
console.log(JSON.stringify(db, null, 4));

//GRID GET REPLACE INSERT DESATIVE
var http = require('http');

var server = http.createServer(function(request, response){
  var app = {'request':request,'response':response,'show':show,'error':true,url:getURL(request.url)}

  app.query = getQuery(request);
  if( app.url[1] && app.url[1]=="layout"){
    publicFile(app.url[2], app)
  }

  if(request.method == 'GET'){


    if(app.query.query){

      app.error = false;
      var query;
      try{
        query = JSON.parse(app.query.query);
      }catch(e){
        query = "{}"
      }
      //saveTransaction(app);
      /*var doc = app.query.get;
      delete app.query.get;
      var db_doc = db[doc].rows ;*/
      show(response, {"query":JSON.stringify(query, null, 4)});
    }

    if(app.query.replace){
      app.error = false;
      //saveTransaction(app);
      show(response, JSON.stringify(app.query, null, 4));
    }

    if(app.query.insert){
      app.error = false;
      //saveTransaction(app);
      var doc = app.query.insert;
      delete app.query.insert;
      app.query._id = doc+'_'+db[doc].index;
      var db_doc = db[doc];
      db_doc.rows.push(app.query);
      db_doc.index++;
      console.log(db_doc);
      db[doc] = db_doc;

      saveFile('content/'+doc+'.js', JSON.stringify(db_doc,null, 4));
      show(response, JSON.stringify(app.query, null, 4));
    }

    if(app.query.desactive){
      app.error = false;
      //saveTransaction(app);
      show(response, JSON.stringify(app.query, null, 4));
    }

    if(app.error){
      show(response, 'Erro')
    }

  }else{
    show(response, 'Não há methodos post')
  }

}).listen('4500');
