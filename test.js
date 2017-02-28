    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}var falconexample = "FALCON stop";
var falconregexp = /(?:^|\s)FALCON\s(.*?)\s(.*?)(?:\s|$)/g;
var match = falconregexp.exec(falconexample);
console.log(match == undefined); 
//console.log(match[1]); // abc
console.log(match); 
console.log(match[2]); // abc
