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
};
THREE.RubiksCube.prototype = Object.create(THREE.Group.prototype);
THREE.RubiksCube.prototype.constructor = THREE.RubiksCube;
THREE.RubiksCube.prototype.createBlock =  function createBlock(options, orientation){
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
	top.style.transform = "translateX("+ (-options.size.width / 2) + "px)" + "translateY(" + (-options.size.height) + "px)" + "rotate3d(1, 0, 0, 90deg) ";
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
	right.style.transform =" rotate3d(0, 1, 0, -90deg)"+ "translateY(" + (-options.size.height / 2) + "px)";
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
	block.rotateOnAxis(new THREE.Vector3(1, 0, 0) , 180 * orientation.x *Math.PI / 180 );
	block.rotateOnAxis(new THREE.Vector3(0, 1, 0) , 180 * orientation.y *Math.PI / 180 );
	block.rotateOnAxis(new THREE.Vector3(0, 0, 1) , 180 * orientation.z *Math.PI / 180 );
	Object.assign(block.userData, {"orientation": orientation.clone()});
	
	return block;
};


THREE.GANCube333 = function(options){
	THREE.RubiksCube.apply(this, [document.createElement("div")]);
	[-1, 0, 1].forEach((y)=>{
	    [-1, 0, 1].forEach((x)=>{
	        [-1, 0, 1].forEach((z)=>{
		        const block = this.createBlock(options, new THREE.Vector3(x, y , z));
		        block.position.x = x * options.size.width;
		        block.position.y = y * options.size.height;
		        block.position.z = z * options.size.depth;
		        block.userData.orientation = new THREE.Vector3(x, y, z);
		        // block.rotateOnAxis (new THREE.Vector3(1, 0, 0), 45 * Math.PI / 180);
		        this.add(block);
	        })
	    })
	});
};
THREE.GANCube333.prototype = Object.create(THREE.RubiksCube.prototype);
THREE.GANCube333.prototype.constructor = THREE.GANCube333;
