fs = require('fs');
var layout = fs.readFileSync('./layout/layout.html', "utf8");

module.exports = function(data){
  var html;
  for(i in data){
    html = layout.replace("{{"+i+"}}", data[i]);

  }
  html = html.replace(/\{\{(.)*\}\}/g,"")
  return (html);
}
