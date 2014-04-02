var output = document.getElementById('terminal-output');
var input = document.getElementById('input');

function addLine(line){
	output.innerHTML+=line;
}

function newLine(){
	addLine("</br>");
}

function removeLastChar(){
	output.innerHTML = output.innerHTML.substring(0, output.innerHTML.length - 1);
}

function clear(){
	output.innerHTML = "";
}

function changeAppearance(scheme){
	console.log("TEST");
	document.body.style.background = scheme.background;
	var links = document.getElementsByTagName("a");
    for(var i=0;i<links.length;i++)
    {
        if(links[i].href)
        {
            links[i].style.color = scheme.font;  
        }
    }
    var pres = document.getElementsByTagName("pre");
    for(var i=0;i<pres.length;i++)
    {
        pres[i].style.color = scheme.font;
    }
    input.style.color = scheme.font;
}


initTerminal();

function getFocus(){
	input.focus();
}

function newCommand(event){
	if (event.keyCode == 13){
		var command = input.value;
		input.value = "";
		addLine("user@malt3.de > "+command+"</br>");

		switch(command)
		{
			case "help":
				addLine("available commands are: \"blog\", \"twitter\", \"github\", \"whoami\", \"clear\", \"secret\" and \"help\" </br>");
				break;
			case "blog":
				var url = "http://blog.malt3.de";
				var win=window.open(url, '_blank');
  				win.focus();
				break;
			case "twitter":
				var url = "http://twitter.com/malt3";
				var win=window.open(url, '_blank');
  				win.focus();
				break;
			case "github":
				var url = "http://github.com/malt3";
				var win=window.open(url, '_blank');
  				win.focus();
				break;
			case "clear":
				clear();
				break;
			case "whoami":
				addLine("Hey visitor, my name is Malte and i am a tech enthusiast from Germany. You can visit my <a href=\"http://blog.malt3.de\">blog</a> to find out more about me.</br>");
				break;
			case "solarized":
				changeAppearance(schemesArray[0]);
				break;
			case "white":
				changeAppearance(schemesArray[1]);
				break;
			case "default":
				changeAppearance(schemesArray[2]);
				break;
			case "secret":
				random = Math.floor(Math.random() * secretArray.length);
				console.log(random);
				addLine(secretArray[random]+"</br>");
				break;
			case "nyan":
				for (var i = 0; i < nyanArray.length; i++) {
					addLine(nyanArray[i]);
				};
				break;
			default:
				addLine("unknown command. Use \"help\" to see available commands</br>");
				break;
		}
	}
}

function initSystem(){
	for (var i = 0; i < sysInits.length; i++) {
		addLine("loading "+sysInits[i]+" .... [OK]</br>");
	};
}

function initTerminal(){
clear();
for (var i = 0; i <= 15; i++) { //Only show the logo
	addLine(stringArray[i]);
};

function flicker(times, callback){
	if (times > 0){
		switch(times%7)
		{
			case 0:
				addLine("-");
    			break;
    		case 1:
				addLine("\\");
    			break;
    		case 2:
				addLine("|");
    			break;
    		case 3:
				addLine("/");
    			break;
			case 4:
				addLine("-");
    			break;
			case 5:
				addLine("\\");
    			break;
			case 6:
				addLine("|");
    			break;
			case 7:
				addLine("/");
    			break;
    	}
    	setTimeout(function(){
			removeLastChar();
			flicker(times-1, callback);
    	},100);
	}else{
		callback();
	}
}

function loading(callback){
	function addChar(times, callback){
		if (times > 0) {
			addLine("=");
			setTimeout(function(){
				addChar(times-1, callback);
    		},90);
		}else{
			callback();
		}
	}
	addLine("[");
	var closeBracket = function(){
		addLine("]");
		callback();
	};
	addChar(15, closeBracket);
}

var delay=700;// 0.7 seconds
setTimeout(function(){
    addLine(stringArray[16]);
    loading(function(){
    	addLine(stringArray[17]);
    	var cb = function() {
    	newLine();
    	initSystem();
    	addLine(stringArray[18]);
    	addLine(stringArray[19]);
    	addLine(stringArray[20]);
    	document.getElementById('prompt').style.visibility='visible';
    	getFocus();
    	};
    	flicker(25, cb);
   });
    
},delay);
}