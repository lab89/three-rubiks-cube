//Object.assing polyfill
if (typeof Object.assign != 'function') {
	// Must be writable: true, enumerable: false, configurable: true
	Object.defineProperty(Object, "assign", {
		value: function assign(target, varArgs) { // .length of function is 2
			'use strict';
			if (target == null) { // TypeError if undefined or null
				throw new TypeError('Cannot convert undefined or null to object');
			}
			
			var to = Object(target);
			
			for (var index = 1; index < arguments.length; index++) {
				var nextSource = arguments[index];
				
				if (nextSource != null) { // Skip over if undefined or null
					for (var nextKey in nextSource) {
						// Avoid bugs when hasOwnProperty is shadowed
						if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
							to[nextKey] = nextSource[nextKey];
						}
					}
				}
			}
			return to;
		},
		writable: true,
		configurable: true
	});
}
// THREE exist check
// THREE CSS3DObject exist check

THREE.NNNCube = function MagicCube(){
	THREE.Group.apply(this);		
};
THREE.NNNCube.prototype = Object.create(THREE.Group.prototype);
THREE.NNNCube.prototype.constructor = THREE.NNNCube; 

THREE.Cube333 = function Cube333(options){
	THREE.NNNCube.apply(this);
	this._options = options;	
	this.coordInfo = {
		x : 0,
		l : -1,
		r : 1,
		f : 1,
		b : -1,
		u : -1,
		d : 1,
	};		

	this.blocks = [
		["luf", "ruf", "rub", "lub"],
		["ldf", "rdf", "rdb", "ldb"],
		["lxf", "rxf", "rxb", "lxb"],		
		["xdf", "rdx", "xdb", "ldx"],
		["xuf", "rux", "xub", "lux"],
		["xxf", "rxx", "xxb", "lxx"],		
		["xux"],
		["xdx"]
	]
	this.blocks.forEach(function(coordsArr){
		coordsArr.forEach(function(coordString){
			const coords = coordString.split("");
			const coordVector = new THREE.Vector3(this.coordInfo[coordString[0]], this.coordInfo[coordString[1]], this.coordInfo[coordString[2]])				
			const block = this.createBlock(options, coordVector)
			this.add(block);
			block.name = coordString; //init coord String
			block.position.x = coordVector.x * options.size.width;
			block.position.y = -coordVector.y * options.size.height;
			block.position.z = coordVector.z * options.size.depth;				
		}.bind(this))		
	}.bind(this)) 
}
THREE.Cube333.prototype = Object.create(THREE.NNNCube.prototype);
THREE.Cube333.prototype.constructor = THREE.Cube333;
THREE.Cube333.prototype.createBlock = function createBlock(options, orientation){
	const commonStyle = {
		position: "absolute",
		backgroundColor: "black",
		borderRadius : "30px",
		backfaceVisibility : "visible",
		width: options.size.width + "px",
		height: options.size.height + "px",
	};
	
	const blockElement = document.createElement("div");
	blockElement.style.position = "absolute";
	blockElement.style.display = "block";
	blockElement.style.transformStyle = "preserve-3d";
	
	
	const faceElement = document.createElement("div");
	Object.assign(faceElement.style, commonStyle);	
	
	/** top - down face **/
	const top = faceElement.cloneNode(true);
	top.className = "u";
	top.style.transform = "translateX("+ (-options.size.width / 2) + "px)" + "translateY(" + (-options.size.height) + "px)" + "rotate3d(1, 0, 0, -90deg) ";
	blockElement.appendChild(top);
	
	const down = faceElement.cloneNode(true);
	down.className = "d";
	down.style.transform = "translateX("+ (-options.size.width / 2) + "px)" + "rotate3d(1, 0, 0, 90deg) ";
	blockElement.appendChild(down);
	
	/** left - right face **/
	const left = faceElement.cloneNode(true);
	left.className = "l";
	left.style.transform = "translateX(" +  (options.size.width * -1) + "px)"+ "translateY(" + (-options.size.height/ 2) + "px)" + "rotate3d(0, 1, 0, 90deg)";	
	blockElement.appendChild(left);
	
	const right = faceElement.cloneNode(true);
	right.className = "r";
	right.style.transform =" rotate3d(0, 1, 0, 90deg)"+ "translateY(" + (-options.size.height / 2) + "px)";	
	blockElement.appendChild(right);	
	
	/** front - back face **/
	const front =  faceElement.cloneNode(true);
	front.className = "f";
	front.style.transform = "translateX("+ (-options.size.width / 2) + "px)" +"translateZ(" +  (options.size.depth  / 2) + "px)" + "translateY(" + (-options.size.height / 2) + "px)" + "rotate3d(0, 1, 0, 0deg)";	
	blockElement.appendChild(front);
	
	const back =  faceElement.cloneNode(true);
	back.className = "b"
	back.style.transform = "translateX("+ (-options.size.width / 2) + "px)"  + "translateZ(" +  (options.size.depth  * -1 / 2) + "px)" + "translateY(" + (-options.size.height / 2) + "px)" +  "rotate3d(0, 1, 0, -180deg)";	
	blockElement.appendChild(back);

	const xplane =  faceElement.cloneNode(true);
	xplane.className = "z";
	xplane.style.borderRadius = "0px"
	xplane.style.transform = "translateX("+ (-options.size.width / 2) + "px)" + "translateY(" + (-options.size.height / 2) + "px)" + "rotate3d(1, 0, 0, -90deg) ";
	blockElement.appendChild(xplane);

	// see through block plane
	const yplane =  faceElement.cloneNode(true);
	yplane.className = "y";
	yplane.style.borderRadius = "0px"
	yplane.style.transform = "translateX("+ (-options.size.width / 2) + "px)" + "translateY(" + (-options.size.height / 2) + "px)";
	blockElement.appendChild(yplane);

	const zplane =  faceElement.cloneNode(true);
	zplane.className = "x";
	zplane.style.borderRadius = "0px"
	zplane.style.transform = "translateX("+ (-options.size.width / 2) + "px)" + "translateY(" + (-options.size.height / 2) + "px)" + "rotate3d(0, 1, 0, 90deg) ";
	blockElement.appendChild(zplane);
	
	const block = new THREE.CSS3DObject(blockElement);
	Object.assign(block.userData, {"orientation": orientation.clone()});
	
	block.rotateOnAxis(new THREE.Vector3(0, 1, 0), this.children.length * 90 * Math.PI / 180)	

	return block;
}


/**
* param
 *  blockColor : "black, white etc..",
 *  size : {
 *    width :
 *    height :
 *    depth :
 *  },
 *  fitment : ,
 *  stickerColorset : ,
 *  mirror : true / false
* */
THREE.GANCube333 = function(options){
	THREE.Cube333.apply(this, [options]);
	this.stickers = {
		"luf" : ["borderBottomRightRadius"],
		"ldf" : ["borderTopRightRadius"],
		"lxf" : ["borderTopRightRadius", "borderBottomRightRadius"],
		"xdf" : ["borderTopRightRadius", "borderTopLeftRadius"],
		"xuf" : ["borderBottomRightRadius", "borderBottomLeftRadius"]
	}
	this.blocks.forEach(function(arr){
		arr.forEach(function(coord, i){
			this.attachSticker(coord, arr[0], i);
		}.bind(this))
	}.bind(this))
};
THREE.GANCube333.prototype = Object.create(THREE.Cube333.prototype);
THREE.GANCube333.prototype.constructor = THREE.GANCube333;

THREE.GANCube333.prototype.attachSticker = function attachSticker(realCoord, stickerCoord, idx){	
	function faceRotate(text, i){
		const arr = ["f", "r", "b", "l"];
		const index = arr.indexOf(text);
		if(index >= 0){
			const indexSum = index + i;
			return arr[indexSum % arr.length];
		}	
		else return text;
	}
	const block = this.getObjectByName(realCoord); //real coord	
	const blockCoord = block.name.split("");	
	const sticker_coords = stickerCoord.split(""); //sticker coord -> must transform! by faceRotate function
	const sum = Math.abs(this.coordInfo[blockCoord[0]]) + Math.abs(this.coordInfo[blockCoord[1]]) + Math.abs(this.coordInfo[blockCoord[2]]);
	const style = {
		width : this._options.fitment === "fully_fitted" ? "97%" : "90%",
		height : this._options.fitment === "fully_fitted" ? "97%" : "90%",
		margin : this._options.fitment === "fully_fitted" ? "2px" : "8px",
		borderRadius : "30px"
	};
	const element = block.element;
	sticker_coords.forEach(function(sc){			
		const face = element.getElementsByClassName(sc);			
		if(face.length){
			Object.assign(style, {
				backgroundColor : this._options.stickerColorSet[faceRotate(sc, idx % 4)],				
			})			
			if(this.stickers[stickerCoord]){
				this.stickers[stickerCoord].forEach(function(radius){
					style[radius] = "80px";
				}.bind(this))
			}else{
				style["borderRadius"] = "50% 50% 50% 50%";
			}	

			const sticker = document.createElement("div");
			Object.assign(sticker.style, style)
			face[0].appendChild(sticker);
		}				
	}.bind(this))
}
