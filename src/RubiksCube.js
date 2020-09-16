import * as THREE from 'three';
import {CSS3DObject} from 'three/examples/jsm/renderers/CSS3DRenderer'
const NNNCube = function NNNCube(){
	THREE.Group.apply(this);
};
NNNCube.prototype = Object.create(THREE.Group.prototype);
NNNCube.prototype.constructor = NNNCube;



const Cube333 = function Cube333(options){
	NNNCube.apply(this);
	console.log("**********************************")
	console.log("%c THREE JS RUBIKS CUBE!", 'background: #222; color: #bada55')
	console.log("**********************************")
	this.animationEnabled = true;
	this.options = options;
	this._coordInfo = {
		x : 0,
		l : -1,
		r : 1,
		f : 1,
		b : -1,
		u : -1,
		d : 1,
	};

	this._blocks = [
		["luf", "ruf", "rub", "lub"],
		["ldf", "rdf", "rdb", "ldb"],
		["lxf", "rxf", "rxb", "lxb"],
		["xdf", "rdx", "xdb", "ldx"],
		["xuf", "rux", "xub", "lux"],
		["xxf", "rxx", "xxb", "lxx"],
		["xux"],
		["xdx"]
	];

	this._blocks.forEach((coordsArr)=>{
		coordsArr.forEach((coordString)=>{
			const coords = coordString.split("");
			const coordVector = new THREE.Vector3(this._coordInfo[coords[0]], this._coordInfo[coords[1]], this._coordInfo[coords[2]]);
			const block = this._createBlock(this.options, coordVector);			
			this.add(block);
			block.userData = {
				clicked : false,
				origin : coordString
			}
			block.name = coordString; //init coord String
			block.position.x = coordVector.x * this.options.size.width;
			block.position.y = -coordVector.y * this.options.size.height;
			block.position.z = coordVector.z * this.options.size.depth;			
			this._initMouseEventListener(block);
		})
	});

	this._operationsArray = [];
	this.addEventListener("operation", function(event){
		//그룹 없애기		
		if(this.animationEnabled){
			this.animationEnabled = false;
			let tempOperationGroup = this.parent.getObjectByName("tempOperationGroup");
			if(tempOperationGroup){
				if(tempOperationGroup.children.length){
					while(tempOperationGroup.children.length){
						this.attach(tempOperationGroup.children.shift())
					}
				}
				this.parent.remove(tempOperationGroup);
			}
			if(event.index > this._operationsArray.length - 1) {
				this._operationsArray = [];
				this.animationEnabled = true;
				this.dispatchEvent({type : "operationCompleted"});
				return
			}

			const operationInfo = this._makeOperationInfo(this._operationsArray[event.index]);
			tempOperationGroup = this.parent.getObjectByName("tempOperationGroup");
			function inOutQuad(n){
				n *= 2;
				if (n < 1) return 0.5 * n * n;
				return - 0.5 * (--n * (n - 2) - 1);
			}
			let start = null;
			function animation(timestamp){
				if (!start) start = timestamp;
				const progress = timestamp - start;
				if (progress <= this.options.animateDuration) {
					tempOperationGroup.setRotationFromAxisAngle(operationInfo.axis, inOutQuad(progress / 1000) * operationInfo.angle * Math.PI / 180);
					window.requestAnimationFrame(animation.bind(this));
				}else{
					this._operator(this._operationsArray[event.index], tempOperationGroup);				
					this.animationEnabled = true;
					this.dispatchEvent({type : "operation", index : event.index + 1});
					return;
				}
			}
			window.requestAnimationFrame(animation.bind(this));
		}
		
	}.bind(this))
	
};
Cube333.prototype = Object.create(NNNCube.prototype);
Cube333.prototype.constructor = Cube333;
Cube333.prototype._createBlock = function _createBlock(options, orientation){
	const commonStyle = {
		position: "absolute",
		backgroundColor: this.options.blockColor,
		borderRadius : "30px",
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
	back.className = "b";
	back.style.transform = "translateX("+ (-options.size.width / 2) + "px)"  + "translateZ(" +  (options.size.depth  * -1 / 2) + "px)" + "translateY(" + (-options.size.height / 2) + "px)" +  "rotate3d(0, 1, 0, -180deg)";
	blockElement.appendChild(back);

	// see through block plane
	const xplane =  faceElement.cloneNode(true);
	xplane.className = "z";
	xplane.style.borderRadius = "0px";
	xplane.style.width = options.size.width * 0.98 + "px";
	xplane.style.height = options.size.height * 0.98 + "px";
	xplane.style.transform = "translateX("+ (-options.size.width / 2) + "px)" + "translateY(" + (-options.size.height / 2) + "px)" + "rotate3d(1, 0, 0, -90deg) ";
	blockElement.appendChild(xplane);

	const yplane =  faceElement.cloneNode(true);
	yplane.className = "y";
	yplane.style.borderRadius = "0px";
	yplane.style.transform = "translateX("+ (-options.size.width / 2) + "px)" + "translateY(" + (-options.size.height / 2) + "px)";
	yplane.style.width = options.size.width  + "px";
	yplane.style.height = options.size.height * 0.98 + "px";
	blockElement.appendChild(yplane);

	const zplane =  faceElement.cloneNode(true);
	zplane.className = "x";
	zplane.style.borderRadius = "0px";
	zplane.style.transform = "translateX("+ (-options.size.width / 2) + "px)" + "translateY(" + (-options.size.height / 2) + "px)" + "rotate3d(0, 1, 0, 90deg) ";
	zplane.style.width = options.size.width * 0.98 + "px";
	zplane.style.height = options.size.height * 0.98 + "px";
	blockElement.appendChild(zplane);

	const m_top = faceElement.cloneNode(true);
	m_top.style.backgroundColor = '';
	m_top.style.visibility = options.mirror ? 'visible' : 'hidden';
	m_top.className = "mu";
	m_top.style.transform = "translateX("+ (-options.size.width / 2) + "px)" + "translateY(" + (-options.size.height * 4) + "px)" + "rotate3d(1, 0, 0, -90deg) ";
	blockElement.appendChild(m_top);
	
	const m_down = faceElement.cloneNode(true);
	m_down.style.backgroundColor = '';
	m_down.style.visibility = options.mirror ? 'visible' : 'hidden';

	m_down.className = "md";
	m_down.style.transform = "translateX("+ (-options.size.width / 2) + "px)"+ "translateY(" + (options.size.height * 3) + "px)" + "rotate3d(1, 0, 0, 90deg) ";
	blockElement.appendChild(m_down);	
	
	const m_left = faceElement.cloneNode(true);
	m_left.style.backgroundColor = '';
	m_left.style.visibility = options.mirror ? 'visible' : 'hidden';
	m_left.className = "ml";
	m_left.style.transform = "translateX(" +  (options.size.width * -4) + "px)"+ "translateY(" + (-options.size.height/ 2) + "px)" + "rotate3d(0, 1, 0, 90deg)";
	blockElement.appendChild(m_left);
	
	const m_right = faceElement.cloneNode(true);
	m_right.style.backgroundColor = '';
	m_right.style.visibility = options.mirror ? 'visible' : 'hidden';
	m_right.className = "mr";
	m_right.style.transform = "translateX(" +  (options.size.width * 4) + "px)"+  "translateY(" + (-options.size.height / 2) + "px)" + "rotate3d(0, 1, 0, 90deg)";
	blockElement.appendChild(m_right);
	
	const m_front =  faceElement.cloneNode(true);
	m_front.className = "mf";
	m_front.style.visibility = options.mirror ? 'visible' : 'hidden';
	m_front.style.backgroundColor = '';
	m_front.style.transform = "translateX("+ (-options.size.width / 2) + "px)" +"translateZ(" +  (options.size.depth * 3.5) + "px)" + "translateY(" + (-options.size.height / 2) + "px)" + "rotate3d(0, 1, 0, 0deg)";
	blockElement.appendChild(m_front);
	
	const m_back =  faceElement.cloneNode(true);
	m_back.className = "mb";
	m_back.style.backgroundColor = '';
	m_back.style.visibility = options.mirror ? 'visible' : 'hidden';
	m_back.style.transform = "translateX("+ (-options.size.width / 2) + "px)"  + "translateZ(" +  (options.size.depth  * -3.5) + "px)" + "translateY(" + (-options.size.height / 2) + "px)" +  "rotate3d(0, 1, 0, -180deg)";
	blockElement.appendChild(m_back);
	
	const block = new CSS3DObject(blockElement);
	block.rotateOnAxis(new THREE.Vector3(0, 1, 0), this.children.length * 90 * Math.PI / 180);

	return block;
};
Cube333.prototype._operator = function _operator(operation, operationGroup){
		/***
	 * U operation, Y operation. E operation
	 * r -> f - > l -> b
	 * D operation
	 * f -> r -> b -> l
	 * R operation, X operation, S operation
	 * f -> u -> b -> d
	 * L operation
	 * f -> d -> b - > u
	 * F operation, Z operation, M operation
	 * l -> u -> r -> d
	 * B operation
	 * u -> r -> d -> l
	 */
	const operations = {
		"U" : ["r", "f", "l", "b"],
		"u" : ["r", "f", "l", "b"],
		"y" : ["r", "f", "l", "b"],
		"E" : ["f", "r", "b", "l"],
		"D" : ["f", "r", "b", "l"],
		"d" : ["f", "r", "b", "l"],
		"R" : ["f", "u", "b", "d"],
		"r" : ["f", "u", "b", "d"],
		"x" : ["f", "u", "b", "d"],
		"S" : ["r", "u", "l", "d"],
		"L" : ["f", "d", "b", "u"],
		"l" : ["f", "d", "b", "u"],
		"F" : ["l", "u", "r", "d"],
		"f" : ["l", "u", "r", "d"],
		"z" : ["l", "u", "r", "d"],
		"M" : ["u", "f", "d", "b"],
		"B" : ["d", "r", "u", "l"]
	};
	
	const oprs = operations[operation.replace('2', "").replace("'", "")];
	const isDouble = operation.includes("2") ? 2 : 1;
	const isAntiCock = operation.includes("'") ? -1 : 1;
	operationGroup.children.forEach((block)=>{
		let name = "";		
		Array.from(block.name).forEach((string, i)=>{
			const index = oprs.indexOf(string);
			if(index > -1){
				const newIndex = (index + (isDouble * isAntiCock));
				const finalIndex = newIndex % oprs.length;
				name += finalIndex >= 0 ? oprs[finalIndex] : oprs[oprs.length  + finalIndex]
			}else{
				name += string
			}
		});
		block.name = name;
	})
};
Cube333.prototype._parseOperations = function _parseOperations(operations){

	function parse(operation) {
		const array = []
		for (let i = 0; i < operation.length; i++) {
			if (operation[i] === "'" || operation[i] === '2') array[array.length - 1] += operation[i]
			else array.push(operation[i])
		}
		return array;
	}
	
	return parse(operations);
};
Cube333.prototype._makeOperationInfo = function getOperationBlockGroup(operationString){
	
	const tempOperationGroup = new THREE.Group();
	tempOperationGroup.name = "tempOperationGroup";
	this.parent.add(tempOperationGroup);

	let axis;
	let angle = 90;
	if(operationString.includes("R")){
		this.children
		.filter((child) => { return Array.from(child.name).includes("r")})
		.forEach((child)=> {tempOperationGroup.add(child)});
		axis = new THREE.Vector3(1, 0, 0);
		angle = -90;
	}else if(operationString.includes("r")){
		this.children
		.filter((child)=>{ return !Array.from(child.name).includes("l")})
		.forEach((child)=>{tempOperationGroup.add(child)});
		axis = new THREE.Vector3(1, 0, 0);
		angle = -90;
	}else if(operationString.includes("L")){
		this.children
		.filter((child)=>{ return Array.from(child.name).includes("l");})
		.forEach((child)=>{tempOperationGroup.add(child)});
		axis = new THREE.Vector3(-1, 0, 0);
		angle = -90;
	}else if(operationString.includes("l")){
		this.children
		.filter((child)=>{ return !Array.from(child.name).includes("r");})
		.forEach((child)=>{tempOperationGroup.add(child)});
		axis = new THREE.Vector3(-1, 0, 0);
		angle = -90;
	}else if(operationString.includes("F")){
		this.children
		.filter((child)=>{ return Array.from(child.name).includes("f");})
		.forEach((child)=>{tempOperationGroup.add(child)});
		axis = new THREE.Vector3(0, 0, -1);
		angle = 90;
	}else if(operationString.includes("f")){
		this.children
		.filter((child)=>{ return !Array.from(child.name).includes("b");})
		.forEach((child)=>{tempOperationGroup.add(child)});
		axis = new THREE.Vector3(0, 0, -1);
		angle = 90;
	}else if(operationString.includes("B")){
		this.children
		.filter((child)=>{ return Array.from(child.name).includes("b");})
		.forEach((child)=>{tempOperationGroup.add(child)});
		axis = new THREE.Vector3(0, 0, 1);
		angle = 90;
	}else if(operationString.includes("b")){
		this.children
		.filter((child)=>{ return !Array.from(child.name).includes("f");})
		.forEach((child)=>{tempOperationGroup.add(child)});
		axis = new THREE.Vector3(0, 0, 1);
		angle = 90;
	}else if(operationString.includes("U")){
		this.children
		.filter((child)=>{ return Array.from(child.name).includes("u")})
		.forEach((child)=>{tempOperationGroup.add(child)});
		axis = new THREE.Vector3(0, 1, 0);
		angle = -90;
	}else if(operationString.includes("u")){
		this.children
		.filter((child)=>{ return !Array.from(child.name).includes("d")})
		.forEach((child)=>{tempOperationGroup.add(child)});		
		axis = new THREE.Vector3(0, 1, 0);
		angle = -90;
	}else if(operationString.includes("D")){
		this.children
		.filter((child)=>{ return Array.from(child.name).includes("d");})
		.forEach((child)=>{tempOperationGroup.add(child)});
		axis = new THREE.Vector3(0, -1, 0);
		angle = -90;
	}else if(operationString.includes("d")){
		this.children
		.filter((child)=>{ return !Array.from(child.name).includes("u");})
		.forEach((child)=>{tempOperationGroup.add(child)});
		axis = new THREE.Vector3(0, -1, 0);
		angle = -90;
	}else if(operationString.includes("M")){
		this.children
		.filter((child)=>{
			return (child.name.match(/x/g) || []).length === 1
			&& (child.name.match(/f|u|b|d/g) || []).length === 2				
			|| ((child.name.match(/x/g) || []).length === 2 && (/f|u|b|d/.test(child.name)))})
		.forEach((child)=>{tempOperationGroup.add(child)});
		axis = new THREE.Vector3(1, 0, 0);
		angle = 90;
	}else if(operationString.includes("E")){		
		this.children
		.filter((child)=>{
			return (child.name.match(/x/g) || []).length === 1
			&& (child.name.match(/r|b|l|f/g) || []).length === 2		
			|| ((child.name.match(/x/g) || []).length === 2 && (/r|b|l|f/.test(child.name)))})
			.forEach((child)=>{tempOperationGroup.add(child)});
		axis = new THREE.Vector3(0, 1, 0);
		angle = 90;
	}else if(operationString.includes("S")){		
		this.children
		.filter((child)=>{
			return (child.name.match(/x/g) || []).length === 1
			&& (child.name.match(/r|u|l|d/g) || []).length === 2			
			|| ((child.name.match(/x/g) || []).length === 2 && (/r|u|l|d/.test(child.name)))})

		.forEach((child)=>{tempOperationGroup.add(child)});
		axis = new THREE.Vector3(0, 0, 1);
		angle = 90;
	}else if(operationString.includes("x")){	
		while(this.children.length){
			tempOperationGroup.add(this.children.shift())
		}			
		axis = new THREE.Vector3(1, 0, 0);
		angle = -90;
	}
	else if(operationString.includes("y")){
		while(this.children.length){
			tempOperationGroup.add(this.children.shift())
		}	
		axis = new THREE.Vector3(0, 1, 0);
		angle = 90;
	}else if(operationString.includes("z")){
		while(this.children.length){
			tempOperationGroup.add(this.children.shift())
		}	
		axis = new THREE.Vector3(0, 0, 1);
		angle = 90;
	}

	if(operationString.includes("'")){
		angle = angle * -1;
	}
	if(operationString.includes("2")){
		angle = angle * 2;
	}
	
	return {
		angle : angle,
		axis : axis
	}
};
Cube333.prototype.animate = function animate(operations){
	this._operationsArray = this._parseOperations(operations);
	this.dispatchEvent({ type: 'operation', index: 0 })
};
Cube333.prototype._refreshBlocks = function _refreshBlocks(){
	while(this.children.length){
		const block = this.children.shift()
		block.element.remove();
		block.removeEventListener('click');
		block.removeEventListener('mouseover');
		block.removeEventListener('mouseout');

		this.remove(block) // remove block
	}
	this._blocks.forEach((coordsArr)=>{
		coordsArr.forEach((coordString)=>{
			const coords = coordString.split("");
			const coordVector = new THREE.Vector3(this._coordInfo[coords[0]], this._coordInfo[coords[1]], this._coordInfo[coords[2]]);
			const block = this._createBlock(this.options, coordVector);
			this.add(block);
			block.userData = {
				clicked : false,
				origin : coordString
			};
			block.name = coordString; //init coord String
			block.position.x = coordVector.x * this.options.size.width;
			block.position.y = -coordVector.y * this.options.size.height;
			block.position.z = coordVector.z * this.options.size.depth;
			this._initMouseEventListener(block);
		})
	});
}
Cube333.prototype.toggleMirror = function toggleMirror(){
	const faces = ["f", "b", "u", "d", "l", "r"]
	this.children.forEach((child)=>{
		faces.forEach((face)=>{
			const result = child.element.getElementsByClassName("m" + face);
			if(result.length){
				result[0].style.visibility = this.options.mirror ? 'visible' : 'hidden';
			}
		})
	})
}
Cube333.prototype._initMouseEventListener = function _initMouseEventListener(block){

	block.element.addEventListener('mouseover', (event) => {	
		if(!this.options.hoverEnabled) return;			
		if(block.userData.clicked)	return;
		Array.from(block.element.children).forEach((child)=>{					
			if(!child.className.includes('m'))
				child.style.backgroundColor = this.options.hoverColor;		
		});				
	})
	block.element.addEventListener('mouseout', (event)=>{
		if(!this.options.hoverEnabled) return;			
		if(block.userData.clicked)	return;
		Array.from(block.element.children).forEach((child)=>{
			if(!child.className.includes('m'))
				child.style.backgroundColor = this.options.blockColor;
		})				
	})			
	block.element.addEventListener('mousedown', (event) => {
		if(!this.options.clickEnabled) return;	
		if(!block.userData.clicked){
			Array.from(block.element.children).forEach((child)=>{					
				if(!child.className.includes('m'))
					child.style.backgroundColor = this.options.clickColor;		
			});				
		}else{
			Array.from(block.element.children).forEach((child)=>{
				if(!child.className.includes('m'))
					child.style.backgroundColor = this.options.blockColor;
			})					
		}
		block.userData.clicked = !block.userData.clicked;
	})
}
Cube333.prototype.unselectAllBlock = function unselectAllBlock(){
	this.children.forEach((block)=>{
		if(block.userData.clicked){
			Array.from(block.element.children).forEach((child)=>{					
				if(!child.className.includes('m'))
					child.style.backgroundColor = this.options.blockColor;		
			});			
			block.userData.clicked = false;
		}
	})
}
Cube333.prototype.refreshCube = function refreshCube(){	
	this._refreshBlocks();
	this._blocks.forEach((arr) => {
		arr.forEach((coord, i) => {
			this._attachSticker(coord, arr[0], i);
		})
	})
}
Cube333.prototype.refreshStickers = function refreshStickers(){
	const faces =this.children.map((child)=>{		
		return Array.from(child.element.children).filter((childEl)=> {
			return !childEl.className.includes("x")
			&& !childEl.className.includes("y")
			&& !childEl.className.includes("z")
		})
	})
	
	const facesString = ["f", "b", "u", "d", "r","l"];	
	faces.forEach((face)=>{
		face.forEach((child)=>{
			facesString.forEach((faceString)=>{
				const sticker = child.getElementsByClassName("sticker_" + faceString)
				if(sticker.length){										
					sticker[0].style.backgroundColor = this.options.stickerColorSet[faceString];
				}
			})
		})
	})
}
Cube333.prototype.refreshBlockColor = function refreshBlockColor(){
	const faces =this.children.forEach((child)=>{	
		if(!child.userData.clicked){
			Array.from(child.element.children).forEach((childEl)=> {
				if(!childEl.className.includes('m'))
					childEl.style.backgroundColor = this.options.blockColor;
			})
		}else{
			Array.from(child.element.children).forEach((childEl)=> {
				if(childEl.className.includes('x') || childEl.className.includes('y') || childEl.className.includes('z'))
					childEl.style.backgroundColor = this.options.blockColor;
			})
		}
	})
}

const RubiksCube = function(options){
	Cube333.apply(this, [options]);
	this._stickers = {
		"luf" : ["borderBottomRightRadius"],
		"ldf" : ["borderTopRightRadius"],
		"lxf" : ["borderTopRightRadius", "borderBottomRightRadius"],
		"xdf" : ["borderTopRightRadius", "borderTopLeftRadius"],
		"xuf" : ["borderBottomRightRadius", "borderBottomLeftRadius"]
	};
	this._blocks.forEach((arr) => {
		arr.forEach((coord, i) => {
			this._attachSticker(coord, arr[0], i);
		})
	})
};

RubiksCube.prototype = Object.create(Cube333.prototype);
RubiksCube.prototype.constructor = RubiksCube;
RubiksCube.prototype._attachSticker = function _attachSticker(realCoord, stickerCoord, idx){
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
	const style = {
		width : this.options.fitment === "fully_fitted" ? "97%" : "90%",
		height : this.options.fitment === "fully_fitted" ? "97%" : "90%",
		margin : this.options.fitment === "fully_fitted" ? "5px" : "8px",
		borderRadius : "30px"
	};
	const element = block.element;
	sticker_coords.forEach((sc) => {
		const face = element.getElementsByClassName(sc);
		if(face.length){
			Object.assign(style, {
				backgroundColor : this.options.stickerColorSet[faceRotate(sc, idx % 4)],
			})
			if(this._stickers[stickerCoord]){
				this._stickers[stickerCoord].forEach((radius) => {
					style[radius] = this.options.size.width * 0.3 + "px";
				})
			}else{
				style["borderRadius"] = "50% 50% 50% 50%";
			}

			const sticker = document.createElement("div");
			sticker.className = "sticker_" + faceRotate(sc, idx % 4);
			Object.assign(sticker.style, style)
			face[0].appendChild(sticker);

			const mirrorFace = element.getElementsByClassName('m'+sc);
			if(mirrorFace.length){			
				const mirrorSticker = sticker.cloneNode();
				mirrorFace[0].appendChild(mirrorSticker);
			}
		}
	})

	// remove empty mirror
	const emptyMirror = Array.from(element.children)
		.filter((el)=> el.className.includes('m') && el.children.length === 0)
		.forEach((el)=> el.remove());
};

export default RubiksCube ;
