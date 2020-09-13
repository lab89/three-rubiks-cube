(function(){
	const NNNCube = function NNNCube(){
		THREE.Group.apply(this);
	};
	NNNCube.prototype = Object.create(THREE.Group.prototype);
	NNNCube.prototype.constructor = NNNCube;

	const Cube333 = function Cube333(options){
		NNNCube.apply(this);
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
		];
		this.blocks.forEach(function(coordsArr){
			coordsArr.forEach(function(coordString){
				const coords = coordString.split("");
				const coordVector = new THREE.Vector3(this.coordInfo[coords[0]], this.coordInfo[coords[1]], this.coordInfo[coords[2]]);
				const block = this.createBlock(options, coordVector);
				this.add(block);
				block.name = coordString; //init coord String
				block.position.x = coordVector.x * options.size.width;
				block.position.y = -coordVector.y * options.size.height;
				block.position.z = coordVector.z * options.size.depth;
			}.bind(this))
		}.bind(this));
	
		this.operationsArray = [];
		this.addEventListener("operation", function(event){
			if(event.index > this.operationsArray.length - 1) {
				this.dispatchEvent({type : "operationCompleted"});
				return
			}
			const operationInfo = this.operationInfo(this.operationsArray[event.index]);
			const tempOperationGroup = this.parent.getObjectByName("tempOperationGroup");
			function inOutQuad(n){
				n *= 2;
				if (n < 1) return 0.5 * n * n;
				return - 0.5 * (--n * (n - 2) - 1);
			}
			let start = null;
			function animation(timestamp){
				if (!start) start = timestamp;
				const progress = timestamp - start;
				if (progress <= 1000) {
					tempOperationGroup.setRotationFromAxisAngle(operationInfo.axis, inOutQuad(progress / 1000) * operationInfo.angle * Math.PI / 180);
					window.requestAnimationFrame(animation.bind(this));
				}else{
					this.operator(this.operationsArray[event.index], tempOperationGroup);
					this.dispatchEvent({type : "operation", index : event.index + 1});
					return;
				}
			}
			window.requestAnimationFrame(animation.bind(this));
		}.bind(this))
		
	};
	Cube333.prototype = Object.create(NNNCube.prototype);
	Cube333.prototype.constructor = Cube333;
	Cube333.prototype.createBlock = function createBlock(options, orientation){
		const commonStyle = {
			position: "absolute",
			backgroundColor: "black",
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
		back.className = "b"
		back.style.transform = "translateX("+ (-options.size.width / 2) + "px)"  + "translateZ(" +  (options.size.depth  * -1 / 2) + "px)" + "translateY(" + (-options.size.height / 2) + "px)" +  "rotate3d(0, 1, 0, -180deg)";
		blockElement.appendChild(back);
	
		const xplane =  faceElement.cloneNode(true);
		xplane.className = "z";
		xplane.style.borderRadius = "0px"
		xplane.style.width = options.size.width * 0.9 + "px";
		xplane.style.height = options.size.height * 0.9 + "px";
		xplane.style.transform = "translateX("+ (-options.size.width / 2) + "px)" + "translateY(" + (-options.size.height / 2) + "px)" + "rotate3d(1, 0, 0, -90deg) ";
		blockElement.appendChild(xplane);
	
		// see through block plane
		const yplane =  faceElement.cloneNode(true);
		yplane.className = "y";
		yplane.style.borderRadius = "0px"
		yplane.style.transform = "translateX("+ (-options.size.width / 2) + "px)" + "translateY(" + (-options.size.height / 2) + "px)";
		yplane.style.width = options.size.width * 0.9 + "px";
		yplane.style.height = options.size.height * 0.9 + "px";
		blockElement.appendChild(yplane);
	
		const zplane =  faceElement.cloneNode(true);
		zplane.className = "x";
		zplane.style.borderRadius = "0px"
		zplane.style.transform = "translateX("+ (-options.size.width / 2) + "px)" + "translateY(" + (-options.size.height / 2) + "px)" + "rotate3d(0, 1, 0, 90deg) ";
		zplane.style.width = options.size.width * 0.9 + "px";
		zplane.style.height = options.size.height * 0.9 + "px";
		blockElement.appendChild(zplane);
		
		const block = new THREE.CSS3DObject(blockElement);
		Object.assign(block.userData, {"orientation": orientation.clone()});
		block.rotateOnAxis(new THREE.Vector3(0, 1, 0), this.children.length * 90 * Math.PI / 180)
	
		return block;
	};
	Cube333.prototype.operator = function operator(operation, operationGroup){
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
			"y" : ["r", "f", "l", "b"],
			"E" : ["f", "r", "b", "l"],
			"D" : ["f", "r", "b", "l"],
			"R" : ["f", "u", "b", "d"],
			"x" : ["f", "u", "b", "d"],
			"S" : ["l", "u", "r", "d"],
			"L" : ["f", "d", "b", "u"],
			"F" : ["l", "u", "r", "d"],
			"Z" : ["l", "u", "r", "d"],
			"M" : ["f", "d", "b", "u"],
			"B" : ["u", "r", "d", "l"]
		};
		
		const oprs = operations[operation.replace('2', "").replace("'", "")];
		const isDouble = operation.includes("2") ? 2 : 1;
		const isAntiCock = operation.includes("'") ? -1 : 1;
	
		operationGroup.children.forEach(function(block){
			// console.log("before : ", block.name)
			let name = "";
			Array.from(block.name).forEach(function(string, i){
				const index = oprs.indexOf(string);
				if(index > -1){
					const newIndex = (index + isDouble) * isAntiCock;
					const finalIndex = newIndex % oprs.length;
					name += oprs[finalIndex]
				}else{
					name += string
				}
			});
			// console.log("after : ", name);
			block.name = name;
		})
	};
	Cube333.prototype.parseOperations = function parseOperations(operations){
	
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
	Cube333.prototype.operationInfo = function getOperationBlockGroup(operationString){
		let tempOperationGroup = this.parent.getObjectByName("tempOperationGroup");
		if(tempOperationGroup){
			if(tempOperationGroup.children.length){
				while(tempOperationGroup.children.length){
					this.attach(tempOperationGroup.children[tempOperationGroup.children.length - 1])
				}
			}
			this.parent.remove(tempOperationGroup);
		}
		tempOperationGroup = new THREE.Group();
		tempOperationGroup.name = "tempOperationGroup";
		this.parent.add(tempOperationGroup);
	
		let axis;
		let angle = 90;
		if(operationString.includes("R")){
			this.children
			.filter(function(child){ return Array.from(child.name).includes("r")})
			.forEach(function(child){tempOperationGroup.add(child)}.bind(this));
			axis = new THREE.Vector3(1, 0, 0);
			angle = -90;
		}else if(operationString.includes("L")){
			this.children
			.filter(function(child){ return Array.from(child.name).includes("l");})
			.forEach(function(child){tempOperationGroup.add(child)}.bind(this));
			axis = new THREE.Vector3(-1, 0, 0);
			angle = 90;
		}else if(operationString.includes("F")){
			this.children
			.filter(function(child){ return Array.from(child.name).includes("f");})
			.forEach(function(child){tempOperationGroup.add(child)}.bind(this));
			axis = new THREE.Vector3(0, 0, -1);
			angle = 90;
		}else if(operationString.includes("B")){
			this.children
			.filter(function(child){ return Array.from(child.name).includes("b");})
			.forEach(function(child){tempOperationGroup.add(child)}.bind(this));
			axis = new THREE.Vector3(0, 0, 1);
			angle = -90;
		}else if(operationString.includes("U")){
			this.children
			.filter(function(child){ return Array.from(child.name).includes("u")})
			.forEach(function(child){tempOperationGroup.add(child)}.bind(this));
			
			axis = new THREE.Vector3(0, 1, 0);
			angle = -90;
		}else if(operationString.includes("D")){
			this.children
			.filter(function(child){ return Array.from(child.name).includes("d");})
			.forEach(function(child){tempOperationGroup.add(child)}.bind(this));
			axis = new THREE.Vector3(0, -1, 0);
			angle = 90;
		}else if(operationString.includes("M")){
			/***
			 * ["lxf", "rxf", "rxb", "lxb"],
			["xdf", "rdx", "xdb", "ldx"],
			["xuf", "rux", "xub", "lux"],
			["xxf", "rxx", "xxb", "lxx"],
			["xux"],
			["xdx"]
			 *
			 */
			this.children
			.filter(function(child){
				return (child.name.match(/x/g) || []).length === 1
				&& (
					/(?=.*f)(?=.*u).*/.test(child.name)
					|| /(?=.*u)(?=.*b).*/.test(child.name)
					|| /(?=.*d)(?=.*b).*/.test(child.name)
					|| /(?=.*d)(?=.*f).*/.test(child.name))
					|| ((child.name.match(/x/g) || []).length === 2 && (/f|u|b|d/.test(child.name)))})
			.forEach(function(child){tempOperationGroup.add(child)}.bind(this));
			axis = new THREE.Vector3(1, 0, 0);
			angle = 90;
		}else if(operationString.includes("E")){
			this.children
			.filter(function(child){
				return (child.name.match(/x/g) || []).length === 1
				&&
				(
					/(?=.*f)(?=.*r).*/.test(child.name)
					|| /(?=.*r)(?=.*b).*/.test(child.name)
					|| /(?=.*b)(?=.*l).*/.test(child.name)
					|| /(?=.*l)(?=.*f).*/.test(child.name))
					|| ((child.name.match(/x/g) || []).length === 2 && (/r|b|l|f/.test(child.name)))})
				.forEach(function(child){tempOperationGroup.add(child)}.bind(this));
			axis = new THREE.Vector3(0, 1, 0);
			angle = 90;
		}else if(operationString.includes("S")){
			this.children
			.filter(function(child){
				return (child.name.match(/x/g) || []).length === 1
				&&
				(
					/(?=.*u)(?=.*r).*/.test(child.name)
					|| /(?=.*r)(?=.*d).*/.test(child.name)
					|| /(?=.*d)(?=.*l).*/.test(child.name)
					|| /(?=.*l)(?=.*u).*/.test(child.name))
					|| ((child.name.match(/x/g) || []).length === 2 && (/r|u|l|d/.test(child.name)))})
	
			.forEach(function(child){tempOperationGroup.add(child)}.bind(this));
			axis = new THREE.Vector3(0, 0, 1);
			angle = 90;
		}else if(operationString.includes("x")){
			this.children
			.forEach(function(child){tempOperationGroup.add(child)}.bind(this));
			axis = new THREE.Vector3(1, 0, 0);
			angle = 90;
		}
		else if(operationString.includes("y")){
			this.children
			.forEach(function(child){tempOperationGroup.add(child)}.bind(this));
			axis = new THREE.Vector3(0, 1, 0);
			angle = 90;
		}else if(operationString.includes("z")){
			this.children
			.forEach(function(child){tempOperationGroup.add(child)}.bind(this));
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
		this.operationsArray = this.parseOperations(operations);
		this.dispatchEvent({ type: 'operation', index: 0 })
	};
	if(window.THREE){
		THREE.RubiksCube = function(options){
			Cube333.apply(this, [options]);
			this.stickers = {
				"luf" : ["borderBottomRightRadius"],
				"ldf" : ["borderTopRightRadius"],
				"lxf" : ["borderTopRightRadius", "borderBottomRightRadius"],
				"xdf" : ["borderTopRightRadius", "borderTopLeftRadius"],
				"xuf" : ["borderBottomRightRadius", "borderBottomLeftRadius"]
			};
			this.blocks.forEach(function(arr){
				arr.forEach(function(coord, i){
					this.attachSticker(coord, arr[0], i);
				}.bind(this))
			}.bind(this))
		};
		THREE.RubiksCube.prototype = Object.create(Cube333.prototype);
		THREE.RubiksCube.prototype.constructor = THREE.RubiksCube;
		THREE.RubiksCube.prototype.attachSticker = function attachSticker(realCoord, stickerCoord, idx){
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
				margin : this._options.fitment === "fully_fitted" ? "5px" : "8px",
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
					sticker.className = "sticker";
					Object.assign(sticker.style, style)
					face[0].appendChild(sticker);
				}
			}.bind(this))
		};
	}else{
		console.error("need threejs, css3drenderer")
	}
	

}(window.THREE))
