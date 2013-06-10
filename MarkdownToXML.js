
test = "#Goal G_1 1\nGoal_Explanation\n##Context C_7 7\nContext_Explanation\n\nTitle:Test\nSecond content";

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

var findParent = function(title, depth, text){
	if(title === "Goal") {
		switch (depth){
			case 1:return null; break;
			case 2:break;	
		}
	}
}

var findChildren = function(title, depth){
	
}

var parseMarkdown = function(markdownText){
	
	//var block = markdownText.split(/^#+\s*/m);
	var block = markdownText
		.replace(/^(#+)\s*/mg, "<!--split-->$1 ")
		.split("<!--split-->");
	
	for(var i = 1 ; i < block.length ; i++ ) {
		var node = {};
		var lines = splitByLines(block[i]);
		var parts = trim(lines.shift()).split(" ");
		node.depth    = parts[0].length;
		node.title    = parts[1];
		node.name     = parts[2];
		node.id       = parts[3];
		node.contents = parseAllContents(lines.join("\n"));
		node.parent   = null;//findParent(lines, depth, markdownText);
		node.children = [];
		console.log(node);
	}

}

parseMarkdown(test);

