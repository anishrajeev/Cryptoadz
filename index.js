const { createCanvas, loadImage, Image, createImageData } = require('canvas')
const fs = require('fs');
const fetch = require('node-fetch');
const canvas = createCanvas(1440, 1440)
const ctx = canvas.getContext('2d')
const IPFS = require('ipfs-core')
var ans = 0;
async function create(i, backgroundData, node){
	var dict = {
		"Grey Foam": {
			"r": 204,
			"g": 204,
			"b": 204,
			"a": 0
		},
		"Greige": {
			"r": 191,
			"g": 187,
			"b": 152,
			"a": 0
		},
		"Mold": {
			"r": 88,
			"g": 96,
			"b": 73,
			"a": 0
		},
		"Universe Foam": {
			"r": 204,
			"g": 187,
			"b": 204,
			"a": 0
		},
		"Damp": {
			"r": 104,
			"g": 134,
			"b": 121,
			"a": 0
		},
		"Middlegrey": {
			"r": 125,
			"g": 125,
			"b": 125,
			"a": 0
		},
		"Greyteal": {
			"r": 93,
			"g": 133,
			"b": 133,
			"a": 0
		},
		"Bruise": {
			"r": 156,
			"g": 135,
			"b": 158,
			"a": 0
		},
		"Dark": {
			"r": 47,
			"g": 54,
			"b": 53,
			"a": 0
		},
		"Blanket": {
			"r": 102,
			"g": 122,
			"b": 249,
			"a": 0
		},
		"95": {
			"r": 0,
			"g": 128,
			"b": 128,
			"a": 0
		},
		"Bubblegum": {
			"r": 181,
			"g": 121,
			"b": 155,
			"a": 0
		},
		"Violet": {
			"r": 167,
			"g": 160,
			"b": 243,
			"a": 0
		},
		"Salmon": {
			"r": 230,
			"g": 148,
			"b": 136,
			"a": 0
		},
		"Blood": {
			"r": 255,
			"g": 14,
			"b": 14,
			"a": 0
		},
		"Ghost Crash": {
			"r": 8,
			"g": 39,
			"b": 245,
			"a": 0
		},
		"Matrix": {
			"r": 61,
			"g": 62,
			"b": 61,
			"a": 0
		},
	};
	const stream = node.cat('QmWEFSMku6yGLQ9TQr66HjSd9kay8ZDYKbBEfjNi4pLtrr/' + i)
	let data = ''
	for await (const chunk of stream) {
	  data += chunk.toString()
	}
	const metadata = await JSON.parse(data);
	var img = new Image();
	img.onload = await async function() { 
    	await ctx.drawImage(img, 0, 0); 
    	const imageData = ctx.getImageData(0, 0, 1440, 1440);
    	var newImageData = ctx.createImageData(1440, 1440);
    	var j = 0;
    	if(metadata.attributes[0].trait_type == "Custom"){
    		const buffer = canvas.toBuffer('image/png')
			fs.writeFileSync('./images/FTMToadz' + i + '.png', buffer)
			ans+=1;
			console.log(ans);
    	}
    	else{
    		const background = dict[metadata.attributes[0].value];
    		console.log("Working on Cryptoadz #" + i);
	    	for(j = 0; j < imageData.data.length; j+=4){
	    		const obj = {}
	    		obj.r = imageData.data[j];
	    		obj.g = imageData.data[j+1];
	    		obj.b = imageData.data[j+2];
	    		obj.a = imageData.data[j+3];
	    		if(obj.r==background.r&&obj.g==background.g&&obj.b==background.b){
	    			newImageData.data[j] = backgroundData[j];
	    			newImageData.data[j+1] = backgroundData[j+1];
	    			newImageData.data[j+2] = backgroundData[j+2];
	    			newImageData.data[j+3] = backgroundData[j+3];
	    		}
	    		else{
	    			newImageData.data[j] = obj.r;
	    			newImageData.data[j+1] = obj.g;
	    			newImageData.data[j+2] = obj.b;
	    			newImageData.data[j+3] = obj.a;
	    		}
	    	}
	    	metadata.attributes[0].value = "FTM Gradient";
	    	ctx.clearRect(0, 0, canvas.width, canvas.height);
	    	ctx.putImageData(newImageData, 0, 0);
	    	const buffer = canvas.toBuffer('image/png')
			fs.writeFileSync('./images/FTMToadz' + i + '.png', buffer)
			fs.writeFileSync('./metadata/FTMToadz' + i + '.json', JSON.stringify(metadata))
    	}
	}
	img.src = 'https://ipfs.io/ipfs/' + metadata.image.slice(7);
	return "OK";
}
async function generate(){
	const node = await IPFS.create()
	var img = new Image();
	img.onload = await async function() { 
		await ctx.drawImage(img, 0, 0); 
		const imageData = ctx.getImageData(0, 0, 1440, 1440);
		var i = 1;
		for(var i = 1; i <= 6969; i++){
			var response = await create(i, imageData.data, node);
		}
	}
	img.src = './background.jpeg'
}
generate();