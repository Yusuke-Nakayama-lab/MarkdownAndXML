
test = "#Goal G_1 1\nGoal_Explanation\n#Context C_7 7\nContext_Explanation\n\nTitle:Test\nSecond content";

var trim = function(str){
	return str.replace(/(^\s+)|(\s+$)/g, "");
}

var splitByLines = function(str){
	return str.split(/\r\n|\r|\n/g);
}


var parseContent = function(text){
	var lines = splitByLines(text);
	var content = {lines:[]};
	for(var i = 0; i < lines.length; i++){
		var params = lines[i].split(/\s*:\s*/);
		if(params.length > 1){
			content[params[0]] = params[1];
		}else{
			content.lines.push(lines[i]);
		}
	}
	content.text = content.lines.join("\n");
	delete content.lines;
	return content;
}

var parseAllContents = function(text){
	var contents = trim(text).split(/\n\s*\n/);
	for(var i = 0; i < contents.length; i++){
		contents[i] = parseContent(contents[i]);
	}
	return contents;
}

var parseMarkdown = function(markdownText){

	var block = markdownText.split(/^#+\s*/m);
	
	for(var i = 1 ; i < block.length ; i++ ) {
		var node = {};
		var lines = splitByLines(block[i]);
		var parts = trim(lines.shift()).split(" ");
		node.title    = parts[0];
		node.name     = parts[1];
		node.id       = parts[2];
		node.contents = parseAllContents(lines.join("\n"));
		node.parent   = null;
		node.children = [];
		console.log(node);
	}
}

parseMarkdown(test);

