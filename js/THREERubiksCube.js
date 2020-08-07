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

/**
* param
 *  blockColor : "",
 *  size : {
 *    width :
 *    height :
 *    depth :
 *  }
* */
THREE.RubiksCube = function RubiksCube(){
	THREE.Group.apply(this);
	this._corners = [];
	this._edges = [];
	this._centers = [];
};
THREE.RubiksCube.prototype = Object.create(THREE.Group.prototype);
THREE.RubiksCube.prototype.constructor = THREE.RubiksCube;

THREE.RubiksCube.prototype.createConerBlock = function createCornerBlock(options, orientation){

	const commonStyle = {
		position: "absolute",
		// backgroundColor: "black",
		borderRadius : "30px",
		width: options.size.width + "px",
		border : "1px dashed black",
		height: options.size.height + "px",
	};
	
	const blockElement = document.createElement("div");
	blockElement.style.position = "absolute";
	blockElement.style.display = "block";
	blockElement.style.transformStyle = "preserve-3d";
	blockElement.top = (options.size.width * -1) + "px";
	
	
	const faceElement = document.createElement("div");
	Object.assign(faceElement.style, commonStyle);
	const sticker = faceElement.cloneNode(false);
	sticker.style.backgroundColor = "cyan";
	sticker.style.borderBottomRightRadius = "150px";
	faceElement.appendChild(sticker);
	
	/** top - down face **/
	const top = faceElement.cloneNode(true);
	top.style.transform = "translateX("+ (-options.size.width / 2) + "px)" + "translateY(" + (-options.size.height) + "px)" + "rotate3d(1, 0, 0, -90deg) ";
	// top.style.backgroundColor = "green";
	blockElement.appendChild(top);
	
	const down = faceElement.cloneNode(true);
	down.style.transform = "translateX("+ (-options.size.width / 2) + "px)" + "rotate3d(1, 0, 0, -90deg) ";
	// down.style.backgroundColor = "red";
	blockElement.appendChild(down);
	
	/** left - right face **/
	const left = faceElement.cloneNode(true);
	left.style.transform = "translateX(" +  (options.size.width * -1) + "px)"+ "translateY(" + (-options.size.height/ 2) + "px)" + "rotate3d(0, 1, 0, 90deg)";
	// left.style.backgroundColor = "cyan";
	blockElement.appendChild(left);
	
	const right = faceElement.cloneNode(true);
	right.style.transform =" rotate3d(0, 1, 0, 90deg)"+ "translateY(" + (-options.size.height / 2) + "px)";
	// right.style.backgroundColor = "blue";
	blockElement.appendChild(right);
	
	
	/** front - back face **/
	const front =  faceElement.cloneNode(true);
	front.style.transform = "translateX("+ (-options.size.width / 2) + "px)" +"translateZ(" +  (options.size.depth  / 2) + "px)" + "translateY(" + (-options.size.height / 2) + "px)" + "rotate3d(0, 1, 0, 0deg)";
	// front.style.backgroundColor = "black";
	blockElement.appendChild(front);
	
	const back =  faceElement.cloneNode(true);
	back.style.transform = "translateX("+ (-options.size.width / 2) + "px)"  + "translateZ(" +  (options.size.depth  * -1 / 2) + "px)" + "translateY(" + (-options.size.height / 2) + "px)" +  "rotate3d(0, 1, 0, -180deg)";
	// back.style.backgroundColor = "gray";
	blockElement.appendChild(back);
	
	const block = new THREE.CSS3DObject(blockElement);
	Object.assign(block.userData, {"orientation": orientation.clone()});
	
	block.rotateOnAxis(new THREE.Vector3(0, 1, 0), this._corners.length * 90 * Math.PI / 180 * -1)
	this._corners.push(block);
	
	return block;
}
THREE.RubiksCube.prototype.createEdgeBlock = function createEdgeBlock(options, orientation){
	const commonStyle = {
		position: "absolute",
		// backgroundColor: "black",
		width: options.size.width + "px",
		border : "1px dashed black",
		height: options.size.height + "px",
	};
	
	const blockElement = document.createElement("div");
	blockElement.style.position = "absolute";
	blockElement.style.display = "block";
	blockElement.style.transformStyle = "preserve-3d";
	blockElement.top = (options.size.width * -1) + "px";
	
	
	const faceElement = document.createElement("div");
	Object.assign(faceElement.style, commonStyle);
	const sticker = faceElement.cloneNode(false);
	sticker.style.backgroundColor = "purple";
	sticker.style.borderBottomRadius = "150px";
	sticker.style.borderBottomLeftRadius = "100px";
	sticker.style.borderBottomRightRadius = "100px";
	faceElement.appendChild(sticker);
	
	/** top - down face **/
	const top = faceElement.cloneNode(true);
	top.style.transform = "translateX("+ (-options.size.width / 2) + "px)" + "translateY(" + (-options.size.height) + "px)" + "rotate3d(1, 0, 0, -90deg)";
	// top.style.backgroundColor = "green";
	blockElement.appendChild(top);
	
	const down = faceElement.cloneNode(true);
	down.style.transform = "translateX("+ (-options.size.width / 2) + "px)" + "rotate3d(1, 0, 0, -90deg) ";
	// down.style.backgroundColor = "red";
	blockElement.appendChild(down);
	
	/** left - right face **/
	const left = faceElement.cloneNode(true);
	left.style.transform = "translateX(" +  (options.size.width * -1) + "px)"+ "translateY(" + (-options.size.height/ 2) + "px)" + "rotate3d(0, 1, 0, 90deg)";
	// left.style.backgroundColor = "cyan";
	blockElement.appendChild(left);
	
	const right = faceElement.cloneNode(true);
	right.style.transform =" rotate3d(0, 1, 0, 90deg)"+ "translateY(" + (-options.size.height / 2) + "px)";
	// right.style.backgroundColor = "blue";
	blockElement.appendChild(right);
	
	
	/** front - back face **/
	const front =  faceElement.cloneNode(true);
	front.style.transform = "translateX("+ (-options.size.width / 2) + "px)" +"translateZ(" +  (options.size.depth  / 2) + "px)" + "translateY(" + (-options.size.height / 2) + "px)" + "rotate3d(0, 1, 0, 0deg)";
	// front.style.backgroundColor = "black";
	blockElement.appendChild(front);
	
	const back =  faceElement.cloneNode(true);
	back.style.transform = "translateX("+ (-options.size.width / 2) + "px)"  + "translateZ(" +  (options.size.depth  * -1 / 2) + "px)" + "translateY(" + (-options.size.height / 2) + "px)" +  "rotate3d(0, 1, 0, -180deg)";
	// back.style.backgroundColor = "gray";
	blockElement.appendChild(back);
	
	const block = new THREE.CSS3DObject(blockElement);
	Object.assign(block.userData, {"orientation": orientation.clone()});
	
	block.rotateOnAxis(new THREE.Vector3(0, 1, 0), this._edges.length * 180 * Math.PI / 180 * -1)
	this._edges.push(block);
	
	return block;
}
THREE.RubiksCube.prototype.dispose = function dispose(){
	THREE.RubiksCube.RubiksCube.prototype.destroy.call(this);
};

THREE.GANCube333 = function(options){
	THREE.RubiksCube.apply(this, [document.createElement("div")]);
	
	const coord = {
		x : 0,
		l : -1,
		r : 1,
		f : 1,
		b : -1,
		u : -1,
		d : 1
	};
	const topCorner = ["luf", "ruf", "rub", "lub"];
	const bottomCorner = ["ldf", "rdf", "rdb", "ldb"];
	const topEdge = ["xuf", "urx", "xub", "ulx"];
	const middleEdge = ["xmf", "mrx", "xmb", "mlx"];
	const bottomEdge = ["xdf", "drx", "xdb", "dlx"];
	const center = ["xux", "xdx", "xxf", "xxb", "lxx", "rxx"];
	//corner
	const cornerY = [-1, 1];
	const cornerX = [-1, 1];
	const cornerLeftZ = [1, -1];
	const cornerRightZ = [-1, 1];
	
	/**
	 * luf -> ruf -> rub -> lub
	 * top : (-1, -1, 1) -> (1, -1, 1) -> (1, -1, -1) -> (-1, -1, -1)
	 * ldf -> rdf -> rdb -> ldb
	 * bottom : (-1, 1, 1) -> (1, 1, 1) -> (1, 1, -1) -> (-1, 1, -1)
	 */
	// cornerY.forEach(function(y){
	// 	cornerX.forEach(function(x){
	// 		(x === -1? cornerLeftZ : cornerRightZ).forEach(function(z){
	// 			const corner = this.createConerBlock(options, new THREE.Vector3(x, y, z))
	// 			this.add(corner);
	// 			corner.position.x = x * options.size.width;
	// 			corner.position.y = -y * options.size.height;
	// 			corner.position.z = z * options.size.depth;
	// 			if(y === 1) corner.rotateOnAxis(new THREE.Vector3(0, 0, 1), 90 * Math.PI / 180)
	// 		}.bind(this))
	// 	}.bind(this))
	// }.bind(this));
	
	const edgeX = [0, 1, -1];
	const edgeY = [-1];
	const edgeZ = [1, 0, -1];
	/**
	 * xuf -> urx -> xub -> ulx
	 * top : (0, -1, 1) -> (1, -1, 0) -> (0, -1, -1) -> (-1, -1, 0)
	 * xmf -> mrx -> xmb -> mlx
	 * middle : (0, 0, 1) -> (1, 0, 0) -> (0, 0, -1) -> (-1, 0, 0)
	 * xdf -> drx -> xdb -> dlx
	 * bottom : (0, -1, 1) -> (1, -1, 0) -> (0, -1, -1) -> (-1, -1, 0)
	 */
	edgeY.forEach(function(y){
		edgeX.forEach(function(x){
			edgeZ.forEach(function(z){
				if(Math.abs(x) + Math.abs(y) + Math.abs(z) === 2){
					console.log(new THREE.Vector3(x, y, z));
					const edge = this.createEdgeBlock(options, new THREE.Vector3(x, y, z))
					this.add(edge);
					edge.position.x = x * options.size.width;
					edge.position.y = -y * options.size.height;
					edge.position.z = z * options.size.depth;
				}
			}.bind(this))
		}.bind(this))
	}.bind(this))
};
THREE.GANCube333.prototype = Object.create(THREE.RubiksCube.prototype);
THREE.GANCube333.prototype.constructor = THREE.GANCube333;
