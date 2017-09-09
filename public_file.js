fs = require('fs')
module.exports = function(file, app){
  app.error = false;
  var response = app.response
  try{
    var content = fs.readFileSync('./layout/' + file);
    var fileType = file.split(".")
    fileType.reverse()
    var contentType = '';
    if(fileType[0]=='css'){
      contentType = 'text/css'
    }
    if(fileType[0]=='js'){
      contentType = 'text/javascript'
    }
    response.writeHead(200, {"Content-Type": contentType });
    response.write(content);
    response.end();
  }catch(e){
    console.log(e);
    app.error = true;
  }
}
