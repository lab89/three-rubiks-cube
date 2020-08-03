window.CSS3DCube = (function () {
	
	const conf = {
		dimension: 3,
		colors: "half_bright",
		design: "gan",
		fitment: "fully_fitted",
		mirror: true,
		frontMarker: true,
		stickerMarkerColor : "rgb(000, 153, 153)"
	};
	
	const colors = {
		standard: {
			"F": "rgba(23, 158, 82, 1)",
			"B": "rgba(6, 44, 179, 1)",
			"L": "rgba(231, 30, 38, 1)",
			"R": "rgba(253, 116, 35, 1)",
			"U": "rgba(233, 244, 250, 1)",
			"D": "rgba(244, 227, 49, 1)",
		},
		half_bright: {
			"F": "rgba(42, 249, 107, 1)",
			"B": "rgba(5, 34, 174, 1)",
			"L": "rgba(225, 10, 28, 1)",
			"R": "rgba(252, 77, 30, 1)",
			"U": "rgba(230, 245, 252, 1)",
			"D": "rgba(235, 253, 57, 1)",
		},
		full_bright: {
			"F": "rgba(42, 249, 107, 1)",
			"B": "rgba(15, 94, 225, 1)",
			"L": "rgba(225, 10, 28, 1)",
			"R": "rgba(253, 48, 151, 1)",
			"U": "rgba(230, 245, 252, 1)",
			"D": "rgba(235, 253, 57, 1)",
		},
		z_bright: {
			"F": "rgba(40, 246, 102, 1)",
			"B": "rgba(15, 99, 223, 1)",
			"L": "rgba(251, 58, 43, 1)",
			"R": "rgba(243, 161, 40, 1)",
			"U": "rgba(231, 241, 251, 1)",
			"D": "rgba(233, 249, 54, 1)",
		},
	};
	
	const designs = {
		rubiks: {
			corner: '5px',
			edge: '5px',
			center: '5px'
		},
		gan: {
			corner: '20px',
			edge: '60px',
			center: '50%'
		},
		valk: {
			corner: '10px',
			edge: '60px',
			center: '20%'
		},
		qiyi: {
			corner: '30px',
			edge: '30px',
			center: '10%'
		}
	};
	
	const fitments = {
		fitted: {
			width: "90%",
			height: "90%",
			margin: "8px",
			borderRadius: "20px"
		},
		fully_fitted: {
			width: "95%",
			height: "95%",
			margin: "5px",
			borderRadius: "20px"
		}
	};
	const colorScheme = ['F', 'B', 'L', 'R', 'U', 'D'];
	
	/**
	 F,B,R,L,U,D
	 F',B',R',L',U',D'
	 f,b,r,l,u,d,
	 f',b',r',l',u',d'
	 m,e,m',e'
	 x,y,z
	 x',y',z'
	 **/
	
	/**
	 * x : ["R", "L", "R'", "L'", "r", "r'", "l", "l'", "x", "M", "M'"],
	 y : ["U", "D", "U'", "D'", "u", "u'", "d", "d'", "y", "E", "E'"],
	 z : ["F", "B", "F'", "B'", "f", "f'", "b", "b'", "z", "S", "S'"]
	 */
	
	//0, 1, 2, 3, 4, 5
	/**
	 * 0 = v(0, 0, 1) F
	 * 1 = v(0, 0, -1) B
	 * 2 = v(1, 0, 0) R
	 * 3 = v(-1,0, 0) L
	 * 4 = v(0, 1, 0) U
	 * 5 = v(0, -1, 0) D
	 */
	const operations = {};
	operations["R"] = 2;
	operations["L'"] = 2;
	operations["l'"] = 2;
	operations["r"] = 2;
	operations["M"] = 2;
	operations["x"] = 2;
	operations["R2"] = 2;
	operations["L2'"] = 2;
	operations["l2'"] = 2;
	operations["r2"] = 2;
	operations["M2"] = 2;
	operations["x2"] = 2;
	
	
	operations["L"] = 3;
	operations["R'"] = 3;
	operations["l"] = 3;
	operations["r'"] = 3;
	operations["M'"] = 3;
	operations["x'"] = 3;
	operations["L2"] = 3;
	operations["R2'"] = 3;
	operations["l2"] = 3;
	operations["r2'"] = 3;
	operations["M2'"] = 3;
	operations["x2'"] = 3;
	
	
	operations["U"] = 4;
	operations["D'"] = 4;
	operations["u"] = 4;
	operations["d'"] = 4;
	operations["E"] = 4;
	operations["y"] = 4;
	operations["U2"] = 4;
	operations["D2'"] = 4;
	operations["u2"] = 4;
	operations["d2'"] = 4;
	operations["E2"] = 4;
	operations["y2"] = 4;
	
	operations["D"] = 5;
	operations["U'"] = 5;
	operations["u'"] = 5;
	operations["d"] = 5;
	operations["E'"] = 5;
	operations["y'"] = 5;
	operations["D2"] = 5;
	operations["U2'"] = 5;
	operations["u2'"] = 5;
	operations["d2"] = 5;
	operations["E2'"] = 5;
	operations["y2'"] = 5;
	
	
	operations["F"] = 0;
	operations["B'"] = 0;
	operations["f"] = 0;
	operations["b'"] = 0;
	operations["S"] = 0;
	operations["z"] = 0;
	operations["F2"] = 0;
	operations["B2'"] = 0;
	operations["f2"] = 0;
	operations["b2'"] = 0;
	operations["S2"] = 0;
	operations["z2"] = 0;
	
	operations["B"] = 1;
	operations["F'"] = 1;
	operations["f'"] = 1;
	operations["b"] = 1;
	operations["S'"] = 1;
	operations["z'"] = 1;
	operations["B2"] = 1;
	operations["F'2"] = 1;
	operations["f2'"] = 1;
	operations["b2"] = 1;
	operations["S2'"] = 1;
	operations["z2'"] = 1;
	
	window.conf = conf;
	
	function GeneratePiece(data) {
		const commonStyle = {
			position: "absolute",
			backgroundColor: "black",
			width: "160px",
			height: "160px",
		}
		
		const pieceElement = document.createElement("div");
		pieceElement.style.position = "absolute";
		pieceElement.style.display = "block";
		pieceElement.style.transformStyle = "preserve-3d";
		pieceElement.style.width = "160px";
		pieceElement.style.height = "160px";
		
		/** front face **/
		const frontElement = document.createElement("div");
		Object.assign(frontElement.style, commonStyle);
		frontElement.style.transform = "translateZ(80px)";
		pieceElement.appendChild(frontElement);
		
		/** back face **/
		const backElement = document.createElement("div");
		Object.assign(backElement.style, commonStyle);
		backElement.style.transform = "translateZ(-80px)";
		pieceElement.appendChild(backElement);
		
		/** right face */
		const rightElement = document.createElement("div");
		Object.assign(rightElement.style, commonStyle);
		rightElement.style.transform = "translateX(80px) rotateY(90deg)";
		pieceElement.appendChild(rightElement);
		
		/** left face **/
		const leftElement = document.createElement("div");
		Object.assign(leftElement.style, commonStyle);
		leftElement.style.transform = "translateX(-80px) rotateY(90deg)";
		pieceElement.appendChild(leftElement);
		
		/** top face **/
		const topElement = document.createElement("div");
		Object.assign(topElement.style, commonStyle);
		topElement.style.transform = "translateY(-80px) rotateX(90deg)";
		pieceElement.appendChild(topElement);
		
		/** down face **/
		const downElement = document.createElement("div");
		Object.assign(downElement.style, commonStyle);
		downElement.style.transform = "translateY(80px) rotateX(90deg)";
		pieceElement.appendChild(downElement);
		
		const piece = new THREE.CSS3DObject(pieceElement);
		Object.assign(piece.userData, {"orientation": new THREE.Vector3(data.x, data.y, data.z)});
		
		return piece;
	}
	
	function createStickerMarker(){
		const stickerMarker = document.createElement("div");
		Object.assign(stickerMarker.style, {
			width : '60px',
			height : '60px',
			position: "relative",
			left : '45px',
			top : '45px',
			backgroundColor : conf.stickerMarkerColor,
			pointerEvents : 'none'
		});
		stickerMarker.className = 'stickerMarker';
		return stickerMarker;
	}
	function AttachStickers(cube) {
		cube.children.forEach((c) => {
			/**
			 x = -1 -> left
			 x = 1 -> right
			 x = 0 -> center
			 
			 y = -1 -> down
			 y = 1 -> up
			 y = 0 -> center
			 
			 z = 1 -> front
			 z = -1 -> back
			 z = 0 -> center
			 */
			
			const LeftOrRight = c.userData.orientation.x === 1 ? 2 : (c.userData.orientation.x === -1 ? 3 : null);
			const FrontOrBack = c.userData.orientation.z === 1 ? 0 : (c.userData.orientation.z === -1 ? 1 : null);
			const UpOrDown = c.userData.orientation.y === 1 ? 4 : (c.userData.orientation.y === -1 ? 5 : null);
			
			const x = Math.abs(c.userData.orientation.x);
			const y = Math.abs(c.userData.orientation.y);
			const z = Math.abs(c.userData.orientation.z);
			
			const stickerCommonStyle = fitments[conf.fitment];
			
			let sticker = null;
			let mirror = null;
			let radiusConditions = null;
			if (c.element.children[LeftOrRight]) {
				radiusConditions = [];
				sticker = document.createElement("div");
				sticker.addEventListener('click', function (e) {
					if (e.ctrlKey) {
						const stickerMarkers = e.target.getElementsByClassName('stickerMarker');
						const mirrorStickerMarkers = e.target.mirrorSticker.getElementsByClassName('stickerMarker');
						if(stickerMarkers.length > 0){
							while(stickerMarkers.length) stickerMarkers[stickerMarkers.length - 1].remove();
							while(mirrorStickerMarkers.length) mirrorStickerMarkers[mirrorStickerMarkers.length - 1].remove()
						}else{
							e.target.appendChild(createStickerMarker());
							e.target.mirrorSticker.appendChild(createStickerMarker())
						}
					}
				});
				sticker.className = "sticker ";
				sticker.dataset.face = colorScheme[LeftOrRight];
				
				Object.assign(sticker.style, stickerCommonStyle);
				sticker.style.backgroundColor = colors[conf.colors][colorScheme[LeftOrRight]];
				
				
				if ((x + y + z) === conf.dimension) {
					const radius1 = c.userData.orientation.y === 1 ? "Bottom" : "Top";
					const radius2 = c.userData.orientation.z === 1 ? "Right" : "Left";
					radiusConditions.push("border" + radius1 + radius2 + "Radius");
				} else if ((x + y + z) === (conf.dimension - 1)) {
					if (c.userData.orientation.y !== 0) {
						const radius1 = c.userData.orientation.y === 1 ? "Bottom" : "Top";
						radiusConditions.push("border" + radius1 + "RightRadius");
						radiusConditions.push("border" + radius1 + "LeftRadius");
					} else {
						const radius1 = c.userData.orientation.z === 1 ? "Right" : "Left";
						radiusConditions.push("borderTop" + radius1 + "Radius");
						radiusConditions.push("borderBottom" + radius1 + "Radius");
					}
				} else if ((x + y + z) === (conf.dimension - 2)) {
					radiusConditions.push("");
					sticker.style["borderRadius"] = designs[conf.design].center;
				}
				
				sticker.dataset.radius = [...radiusConditions];
				radiusConditions.forEach((c) => {
					if ((x + y + z) === conf.dimension)
						sticker.style[c] = designs[conf.design].corner;
					else if ((x + y + z) === (conf.dimension - 1))
						sticker.style[c] = designs[conf.design].edge;
				});
				mirror = document.createElement("div");
				mirror.className = "mirror";
				mirror.style.position = "absolute";
				mirror.style.visibility = conf.mirror ? "visible" : "hidden";
				mirror.style.transform = "translateX(" + c.userData.orientation.x * 3.5 * 160 + "px) rotateY(90deg)";
				Object.assign(mirror.style, stickerCommonStyle);
				
				const stickerClone = sticker.cloneNode();
				stickerClone.className = "mirrorSticker"
				sticker.mirrorSticker = stickerClone;
				mirror.appendChild(stickerClone);
				c.element.appendChild(mirror);
				c.element.children[LeftOrRight].appendChild(sticker);
			}
			if (c.element.children[FrontOrBack]) {
				radiusConditions = [];
				sticker = document.createElement("div");
				sticker.addEventListener('click', function (e) {
					if (e.ctrlKey) {
						const stickerMarkers = e.target.getElementsByClassName('stickerMarker');
						const mirrorStickerMarkers = e.target.mirrorSticker.getElementsByClassName('stickerMarker');
						if(stickerMarkers.length > 0){
							while(stickerMarkers.length) stickerMarkers[stickerMarkers.length - 1].remove();
							while(mirrorStickerMarkers.length) mirrorStickerMarkers[mirrorStickerMarkers.length - 1].remove()
						}else{
							e.target.appendChild(createStickerMarker());
							e.target.mirrorSticker.appendChild(createStickerMarker())
						}
					}
				});
				sticker.className = "sticker ";
				sticker.dataset.face = colorScheme[FrontOrBack];
				Object.assign(sticker.style, stickerCommonStyle);
				sticker.style.backgroundColor = colors[conf.colors][colorScheme[FrontOrBack]];
				
				if ((x + y + z) === conf.dimension) {
					const radius1 = c.userData.orientation.y === 1 ? "Bottom" : "Top";
					const radius2 = c.userData.orientation.x === 1 ? "Left" : "Right";
					radiusConditions.push("border" + radius1 + radius2 + "Radius");
				} else if ((x + y + z) === (conf.dimension - 1)) {
					if (c.userData.orientation.y !== 0) {
						const radius1 = c.userData.orientation.y === 1 ? "Bottom" : "Top";
						radiusConditions.push("border" + radius1 + "RightRadius");
						radiusConditions.push("border" + radius1 + "LeftRadius");
					} else {
						const radius1 = c.userData.orientation.x === 1 ? "Left" : "Right";
						radiusConditions.push("borderTop" + radius1 + "Radius");
						radiusConditions.push("borderBottom" + radius1 + "Radius");
					}
				} else if ((x + y + z) === (conf.dimension - 2)) {
					radiusConditions.push("");
					sticker.style["borderRadius"] = designs[conf.design].center;
				}
				
				sticker.dataset.radius = [...radiusConditions];
				radiusConditions.forEach((c) => {
					if ((x + y + z) === conf.dimension)
						sticker.style[c] = designs[conf.design].corner;
					else if ((x + y + z) === (conf.dimension - 1))
						sticker.style[c] = designs[conf.design].edge;
				});
				
				mirror = document.createElement("div");
				mirror.className = "mirror";
				mirror.style.transform = "translateZ(" + c.userData.orientation.z * 3.5 * 160 + "px)";
				mirror.style.position = "absolute";
				mirror.style.visibility = conf.mirror ? "visible" : "hidden";
				Object.assign(mirror.style, stickerCommonStyle);
				
				const stickerClone = sticker.cloneNode();
				stickerClone.className = "mirrorSticker"
				sticker.mirrorSticker = stickerClone;
				mirror.appendChild(stickerClone);
				c.element.appendChild(mirror);
				c.element.children[FrontOrBack].appendChild(sticker);
			}
			if (c.element.children[UpOrDown]) {
				radiusConditions = [];
				sticker = document.createElement("div");
				sticker.addEventListener('click', function (e) {
					if (e.ctrlKey) {
						const stickerMarkers = e.target.getElementsByClassName('stickerMarker');
						const mirrorStickerMarkers = e.target.mirrorSticker.getElementsByClassName('stickerMarker');
						if(stickerMarkers.length > 0){
							while(stickerMarkers.length) stickerMarkers[stickerMarkers.length - 1].remove();
							while(mirrorStickerMarkers.length) mirrorStickerMarkers[mirrorStickerMarkers.length - 1].remove()
						}else{
							e.target.appendChild(createStickerMarker());
							e.target.mirrorSticker.appendChild(createStickerMarker())
						}
					}
				});
				sticker.className = "sticker ";
				sticker.dataset.face = colorScheme[UpOrDown];
				Object.assign(sticker.style, stickerCommonStyle);
				sticker.style.backgroundColor = colors[conf.colors][colorScheme[UpOrDown]];
				
				if ((x + y + z) === conf.dimension) {
					const radius1 = c.userData.orientation.z === 1 ? "Top" : "Bottom";
					const radius2 = c.userData.orientation.x === 1 ? "Left" : "Right";
					radiusConditions.push("border" + radius1 + radius2 + "Radius");
				} else if ((x + y + z) === (conf.dimension - 1)) {
					if (c.userData.orientation.z !== 0) {
						const radius1 = c.userData.orientation.z === 1 ? "Top" : "Bottom";
						radiusConditions.push("border" + radius1 + "RightRadius");
						radiusConditions.push("border" + radius1 + "LeftRadius");
					} else {
						const radius1 = c.userData.orientation.x === 1 ? "Left" : "Right";
						radiusConditions.push("borderTop" + radius1 + "Radius");
						radiusConditions.push("borderBottom" + radius1 + "Radius");
					}
				} else if ((x + y + z) === (conf.dimension - 2)) {
					radiusConditions.push("");
					sticker.style["borderRadius"] = designs[conf.design].center;
				}
				
				sticker.dataset.radius = [...radiusConditions];
				radiusConditions.forEach((c) => {
					if ((x + y + z) === conf.dimension)
						sticker.style[c] = designs[conf.design].corner;
					else if ((x + y + z) === (conf.dimension - 1))
						sticker.style[c] = designs[conf.design].edge;
				});
				
				mirror = document.createElement("div");
				mirror.className = "mirror";
				mirror.style.transform = "translateY(" + -c.userData.orientation.y * 3.5 * 160 + "px) rotateX(90deg)";
				mirror.style.position = "absolute";
				mirror.style.visibility = conf.mirror ? "visible" : "hidden";
				Object.assign(mirror.style, stickerCommonStyle);
				
				const stickerClone = sticker.cloneNode();
				stickerClone.className = "mirrorSticker"
				sticker.mirrorSticker = stickerClone;
				
				mirror.appendChild(stickerClone);
				c.element.appendChild(mirror);
				c.element.children[UpOrDown].appendChild(sticker);
			}
		});
	}
	
	if (!window.THREE) {
		console.error('REQUIRED THREE JS')
		return;
	}
	return {
		conf: conf,
		createCube(cubeGroup, options) {
			Object.assign(conf, options);
			[-1, 0, 1].forEach((y) => {
				[-1, 0, 1].forEach((x) => {
					[-1, 0, 1].forEach((z) => {
						const piece = GeneratePiece({
							x: x, y: y, z: z
						});
						piece.position.x = x * 160;
						piece.position.y = y * 160;
						piece.position.z = z * 160;
						cubeGroup.add(piece);
					})
				})
			});
			AttachStickers(cubeGroup);
			return cubeGroup;
		},
		createFrontMarker() {
			const frontMarker = document.createElement('div');
			Object.assign(frontMarker.style, {
				fontSize: "160px"
			})
			frontMarker.innerHTML = "FRONT"
			frontMarker.className = "frontMarker"
			const marker = new THREE.CSS3DObject(frontMarker);
			marker.rotation.x = -1.575;
			marker.position.z = 850;
			marker.position.y = -160;
			return marker;
		},
		changeColors(colorType) {
			const stickers = document.getElementById("CUBE").getElementsByClassName("sticker");
			for (let i = 0; i < stickers.length; i++) {
				const face = stickers[i].dataset.face;
				stickers[i].style.backgroundColor = colors[colorType][face];
			}
			const mirrors = document.getElementById("CUBE").getElementsByClassName("mirrorSticker");
			for (let i = 0; i < mirrors.length; i++) {
				const face = mirrors[i].dataset.face;
				mirrors[i].style.backgroundColor = colors[colorType][face];
			}
		},
		changeFitment(fitmentType) {
			const stickers = document.getElementById("CUBE").getElementsByClassName("sticker");
			for (let i = 0; i < stickers.length; i++) {
				Object.assign(stickers[i].style, fitments[fitmentType]);
				
				const radius = stickers[i].dataset.radius.split(',');
				if (radius.length > 1) {
					radius.forEach((r) => stickers[i].style[r] = designs[conf.design].edge);
				}
				else if (radius.length === 1) {
					if (radius[0].length > 0) stickers[i].style[radius[0]] = designs[conf.design].corner;
					else stickers[i].style["borderRadius"] = designs[conf.design].center;
				}
				
			}
		},
		changeDesign(designType) {
			const stickers = document.getElementById("CUBE").getElementsByClassName("sticker");
			for (let i = 0; i < stickers.length; i++) {
				const radius = stickers[i].dataset.radius.split(',');
				if (radius.length > 1) {
					radius.forEach((r) => stickers[i].style[r] = designs[designType].edge);
				}
				else if (radius.length === 1) {
					if (radius[0].length > 0) stickers[i].style[radius[0]] = designs[designType].corner;
					else stickers[i].style["borderRadius"] = designs[designType].center;
				}
			}

			const mirrorSticker = document.getElementById("CUBE").getElementsByClassName("mirrorSticker");
			for (let i = 0; i < mirrorSticker.length; i++) {
				const radius = mirrorSticker[i].dataset.radius.split(',');
				if (radius.length > 1) {
					radius.forEach((r) => mirrorSticker[i].style[r] = designs[designType].edge);
				}
				else if (radius.length === 1) {
					if (radius[0].length > 0) mirrorSticker[i].style[radius[0]] = designs[designType].corner;
					else mirrorSticker[i].style["borderRadius"] = designs[designType].center;
				}
			}
		},
		changeMirror() {
			const mirror = document.getElementById("CUBE").getElementsByClassName("mirror");
			for (let i = 0; i < mirror.length; i++) {
				mirror[i].style.visibility = conf.mirror ? "visible" : "hidden";
			}
		},
		changeFrontMarker() {
			const marker = document.getElementById("CUBE").getElementsByClassName("frontMarker")
			if (marker.length) marker[0].style.visibility = conf.frontMarker ? "visible" : "hidden";
		},
		operation(cubeGroup, operation) {
			const operationArray = [];
			
			function parseOperation(operation) {
				for (let i = 0; i < operation.length; i++) {
					if (operation[i] === "'" || operation[i] === '2') operationArray[operationArray.length - 1] += "'"
					else operationArray.push(operation[i])
				}
			}
			
			let operationIdx = 0;
			parseOperation(operation)
			rotation(operationArray[0])
			
			function rotation(operation) {
				const matrixType = operations[operation]
				const matrix = new THREE.Matrix3();
				let axis = null;
				
				/**
				 * 0 = v(0, 0, 1) F
				 * 1 = v(0, 0, -1) B
				 * 2 = v(1, 0, 0) R
				 * 3 = v(-1,0, 0) L
				 * 4 = v(0, 1, 0) U
				 * 5 = v(0, -1, 0) D
				 */
				if (matrixType === 0) {
					axis = new THREE.Vector3(0, 0, 1);
					matrix.set(
						Math.round(Math.cos(Math.PI / 2)), -Math.round(Math.sin(Math.PI / 2)), 0,
						Math.round(Math.sin(Math.PI / 2)), Math.round(Math.cos(Math.PI / 2)), 0,
						0, 0, 1
					);
					matrix.transpose()
				} else if (matrixType === 1) {
					axis = new THREE.Vector3(0, 0, -1);
					matrix.set(
						Math.round(Math.cos(Math.PI / 2)), -Math.round(Math.sin(Math.PI / 2)), 0,
						Math.round(Math.sin(Math.PI / 2)), Math.round(Math.cos(Math.PI / 2)), 0,
						0, 0, 1
					);
				} else if (matrixType === 2) {
					axis = new THREE.Vector3(1, 0, 0);
					matrix.set(
						1, 0, 0,
						0, Math.round(Math.cos(Math.PI / 2)), -Math.round(Math.sin(Math.PI / 2)),
						0, Math.round(Math.sin(Math.PI / 2)), Math.round(Math.cos(Math.PI / 2))
					);
					matrix.transpose()
				} else if (matrixType === 3) {
					axis = new THREE.Vector3(-1, 0, 0);
					matrix.set(
						1, 0, 0,
						0, Math.round(Math.cos(Math.PI / 2)), -Math.round(Math.sin(Math.PI / 2)),
						0, Math.round(Math.sin(Math.PI / 2)), Math.round(Math.cos(Math.PI / 2))
					);
				} else if (matrixType === 4) {
					axis = new THREE.Vector3(0, 1, 0);
					matrix.set(
						Math.round(Math.cos(Math.PI / 2)), 0, Math.round(Math.sin(Math.PI / 2)),
						0, 1, 0,
						-Math.round(Math.sin(Math.PI / 2)), 0, Math.round(Math.cos(Math.PI / 2))
					);
					matrix.transpose()
				} else if (matrixType === 5) {
					axis = new THREE.Vector3(0, -1, 0);
					matrix.set(
						Math.round(Math.cos(Math.PI / 2)), 0, Math.round(Math.sin(Math.PI / 2)),
						0, 1, 0,
						-Math.round(Math.sin(Math.PI / 2)), 0, Math.round(Math.cos(Math.PI / 2))
					);
				}
				
				/**
				 x : ["R", "L", "R'", "L'", "r", "r'", "l", "l'", "x", "M", "M'"],
				 y : ["U", "D", "U'", "D'", "u", "u'", "d", "d'", "y", "E", "E'"],
				 z : ["F", "B", "F'", "B'", "f", "f'", "b", "b'", "z", "S", "S'"]
				 */
				let rotationGroup = new THREE.Group();
				rotationGroup.name = 'tempRotate';
				if (operation === "R" || operation === "R'")
					cubeGroup.children.filter((c) => c.userData.orientation.x === 1).forEach((t) => rotationGroup.add(t));
				else if (operation === "L" || operation === "L'")
					cubeGroup.children.filter((c) => c.userData.orientation.x === -1).forEach((t) => rotationGroup.add(t));
				else if (operation === "F" || operation === "F'")
					cubeGroup.children.filter((c) => c.userData.orientation.z === 1).forEach((t) => rotationGroup.add(t));
				else if (operation === "B" || operation === "B'")
					cubeGroup.children.filter((c) => c.userData.orientation.z === -1).forEach((t) => rotationGroup.add(t));
				else if (operation === "U" || operation === "U'")
					cubeGroup.children.filter((c) => c.userData.orientation.y === 1).forEach((t) => rotationGroup.add(t));
				else if (operation === "D" || operation === "D'")
					cubeGroup.children.filter((c) => c.userData.orientation.y === -1).forEach((t) => rotationGroup.add(t));
				else if (operation === "x" || operation === "y" || operation === "z" || operation === "x'" || operation === "y'" || operation === "z'") {
					while (cubeGroup.children.length) {
						rotationGroup.add(cubeGroup.children[cubeGroup.children.length - 1]);
					}
				}
				else if (operation === "M" || operation === "M'")
					cubeGroup.children.filter((c) => c.userData.orientation.x === 0).forEach((t) => rotationGroup.add(t));
				else if (operation === "E" || operation === "E'")
					cubeGroup.children.filter((c) => c.userData.orientation.y === 0).forEach((t) => rotationGroup.add(t));
				else if (operation === "S" || operation === "S'")
					cubeGroup.children.filter((c) => c.userData.orientation.z === 0).forEach((t) => rotationGroup.add(t));
				else if (operation === "r" || operation === "r'")
					cubeGroup.children.filter((c) => c.userData.orientation.x === 1 || c.userData.orientation.x === 0).forEach((t) => rotationGroup.add(t));
				else if (operation === "l" || operation === "l'")
					cubeGroup.children.filter((c) => c.userData.orientation.x === -1 || c.userData.orientation.x === 0).forEach((t) => rotationGroup.add(t));
				else if (operation === "f" || operation === "f'")
					cubeGroup.children.filter((c) => c.userData.orientation.z === 1 || c.userData.orientation.z === 0).forEach((t) => rotationGroup.add(t));
				else if (operation === "b" || operation === "b'")
					cubeGroup.children.filter((c) => c.userData.orientation.z === -1 || c.userData.orientation.z === 0).forEach((t) => rotationGroup.add(t));
				else if (operation === "u" || operation === "u'")
					cubeGroup.children.filter((c) => c.userData.orientation.y === 1 || c.userData.orientation.y === 0).forEach((t) => rotationGroup.add(t));
				else if (operation === "d" || operation === "d'")
					cubeGroup.children.filter((c) => c.userData.orientation.y === -1 || c.userData.orientation.y === 0).forEach((t) => rotationGroup.add(t));
				
				if (window.TWEEN !== undefined) {
					cubeGroup.parent.add(rotationGroup)
					const angle = {radian: 0}
					tween = new TWEEN.Tween(angle)
						.to({radian: -90}, 1000)
						.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
						.onUpdate(() => {
							rotationGroup.setRotationFromAxisAngle(axis, angle.radian * Math.PI / 180)
						})
						.onComplete(function () {
							rotationGroup.children.forEach((c) => {
								c.userData.orientation = c.userData.orientation.applyMatrix3(matrix);
							});
							while (rotationGroup.children.length) {
								cubeGroup.attach(rotationGroup.children[rotationGroup.children.length - 1]);
							}
							scene.getObjectByName('tempRotate').remove();
							operationIdx += 1;
							if (operationIdx > operationArray.length - 1) return;
							rotationGroup = null;
							rotation(operationArray[operationIdx]);
						})
						.onStop(function () {
							while (rotationGroup.children.length) {
								cubeGroup.attach(rotationGroup.children[rotationGroup.children.length - 1]);
							}
						})
						.start()
				} else {
					console.warn("can't do animation! required TWEEN.js")
					rotationGroup.setRotationFromAxisAngle(axis, 1.575)
					rotationGroup.children.forEach((c) => {
						c.userData.orientation = c.userData.orientation.applyMatrix3(matrix);
					});
					while (rotationGroup.children.length) {
						cubeGroup.attach(rotationGroup.children[rotationGroup.children.length - 1]);
					}
					operationIdx += 1;
					if (operationIdx > operationArray.length - 1) return;
					rotation(operationArray[operationIdx]);
				}
				
				// 애니메이션을 어떻게 할 것인가 ? tween 쓰나?x
				// 색깔 전부 입력하기 x
				// three.js 의존성 체크해서 console.err 띄우기 혹은 webpack으로 빌드하기 (클래스로 하는게 나을 듯.. )
				// 회전 방향이 지금 안맞는게 있음 B 같은거 그거 다 맞추기 x
				// morror option 처리 x
				// Front 어딘지 화살표나 표시 x
				// Front 표시 옵션 처리 x
				
				// 섞인거 리셋하는 기능
				// 마우스로 마커 붙일 수 있게 특정 피스 면에 스티커 셋팅하는 함수
				// design 프로퍼티 다듬기
			}
		},
		animationController() {
			function parseOperation(operationString) {
				const arr = [];
				for (let i = 0; i < operationString.length; i++) {
					if (operationString[i] === "'") arr[arr.length - 1] += "'"
					if (operationString[i] === "2") arr[arr.length - 1] += "2"
					if (operationString[i] !== "'" && operationString[i] !== "2") arr.push(operationString[i])
				}
				return arr;
			}
			
			function getRotationGroup(cubeGroup, operation, index) {
				const rotationGroup = new THREE.Group();
				rotationGroup.name = 'tempRotation'
				if (operation.includes("R"))
					cubeGroup.children.filter((c) => c.userData.orientation.x === 1).forEach((t) => rotationGroup.add(t));
				else if (operation.includes("L"))
					cubeGroup.children.filter((c) => c.userData.orientation.x === -1).forEach((t) => rotationGroup.add(t));
				else if (operation.includes("F"))
					cubeGroup.children.filter((c) => c.userData.orientation.z === 1).forEach((t) => rotationGroup.add(t));
				else if (operation.includes("B"))
					cubeGroup.children.filter((c) => c.userData.orientation.z === -1).forEach((t) => rotationGroup.add(t));
				else if (operation.includes("U"))
					cubeGroup.children.filter((c) => c.userData.orientation.y === 1).forEach((t) => rotationGroup.add(t));
				else if (operation.includes("D"))
					cubeGroup.children.filter((c) => c.userData.orientation.y === -1).forEach((t) => rotationGroup.add(t));
				else if (operation.includes("x") || operation.includes("y") || operation.includes("z")) {
					while (cubeGroup.children.length) {
						rotationGroup.add(cubeGroup.children[cubeGroup.children.length - 1]);
					}
				}
				else if (operation.includes("M"))
					cubeGroup.children.filter((c) => c.userData.orientation.x === 0).forEach((t) => rotationGroup.add(t));
				else if (operation.includes("E"))
					cubeGroup.children.filter((c) => c.userData.orientation.y === 0).forEach((t) => rotationGroup.add(t));
				else if (operation.includes("S"))
					cubeGroup.children.filter((c) => c.userData.orientation.z === 0).forEach((t) => rotationGroup.add(t));
				else if (operation.includes("r"))
					cubeGroup.children.filter((c) => c.userData.orientation.x === 1 || c.userData.orientation.x === 0).forEach((t) => rotationGroup.add(t));
				else if (operation.includes("l"))
					cubeGroup.children.filter((c) => c.userData.orientation.x === -1 || c.userData.orientation.x === 0).forEach((t) => rotationGroup.add(t));
				else if (operation.includes("f"))
					cubeGroup.children.filter((c) => c.userData.orientation.z === 1 || c.userData.orientation.z === 0).forEach((t) => rotationGroup.add(t));
				else if (operation.includes("b"))
					cubeGroup.children.filter((c) => c.userData.orientation.z === -1 || c.userData.orientation.z === 0).forEach((t) => rotationGroup.add(t));
				else if (operation.includes("u"))
					cubeGroup.children.filter((c) => c.userData.orientation.y === 1 || c.userData.orientation.y === 0).forEach((t) => rotationGroup.add(t));
				else if (operation.includes("d"))
					cubeGroup.children.filter((c) => c.userData.orientation.y === -1 || c.userData.orientation.y === 0).forEach((t) => rotationGroup.add(t));
				
				cubeGroup.parent.add(rotationGroup)
				return rotationGroup
			}
			
			function getAxisAndMatrix(operation) {
				const matrixType = operations[operation]
				const matrix = new THREE.Matrix3();
				let axis = null;
				
				/**
				 * 0 = v(0, 0, 1) F
				 * 1 = v(0, 0, -1) B
				 * 2 = v(1, 0, 0) R
				 * 3 = v(-1,0, 0) L
				 * 4 = v(0, 1, 0) U
				 * 5 = v(0, -1, 0) D
				 */
				const multiply = operation.includes("2") ? 2 : 1
				if (matrixType === 0) {
					axis = new THREE.Vector3(0, 0, 1);
					matrix.set(
						Math.round(Math.cos(Math.PI * multiply / 2)), -Math.round(Math.sin(Math.PI * multiply / 2)), 0,
						Math.round(Math.sin(Math.PI * multiply / 2)), Math.round(Math.cos(Math.PI * multiply / 2)), 0,
						0, 0, 1
					);
					matrix.transpose()
				} else if (matrixType === 1) {
					axis = new THREE.Vector3(0, 0, -1);
					matrix.set(
						Math.round(Math.cos(Math.PI * multiply / 2)), -Math.round(Math.sin(Math.PI * multiply / 2)), 0,
						Math.round(Math.sin(Math.PI * multiply / 2)), Math.round(Math.cos(Math.PI * multiply / 2)), 0,
						0, 0, 1
					);
				} else if (matrixType === 2) {
					axis = new THREE.Vector3(1, 0, 0);
					matrix.set(
						1, 0, 0,
						0, Math.round(Math.cos(Math.PI * multiply / 2)), -Math.round(Math.sin(Math.PI * multiply / 2)),
						0, Math.round(Math.sin(Math.PI * multiply / 2)), Math.round(Math.cos(Math.PI * multiply / 2))
					);
					matrix.transpose()
				} else if (matrixType === 3) {
					axis = new THREE.Vector3(-1, 0, 0);
					matrix.set(
						1, 0, 0,
						0, Math.round(Math.cos(Math.PI * multiply / 2)), -Math.round(Math.sin(Math.PI * multiply / 2)),
						0, Math.round(Math.sin(Math.PI * multiply / 2)), Math.round(Math.cos(Math.PI * multiply / 2))
					);
				} else if (matrixType === 4) {
					axis = new THREE.Vector3(0, 1, 0);
					matrix.set(
						Math.round(Math.cos(Math.PI * multiply / 2)), 0, Math.round(Math.sin(Math.PI * multiply / 2)),
						0, 1, 0,
						-Math.round(Math.sin(Math.PI * multiply / 2)), 0, Math.round(Math.cos(Math.PI * multiply / 2))
					);
					matrix.transpose()
				} else if (matrixType === 5) {
					axis = new THREE.Vector3(0, -1, 0);
					matrix.set(
						Math.round(Math.cos(Math.PI * multiply / 2)), 0, Math.round(Math.sin(Math.PI * multiply / 2)),
						0, 1, 0,
						-Math.round(Math.sin(Math.PI * multiply / 2)), 0, Math.round(Math.cos(Math.PI * multiply / 2))
					);
				}
				return {
					axis: axis,
					matrix: matrix
				}
			}
			
			function generateAnimate(cubeGroup, rotationGroup, axis, matrix, isDouble) {
				const angle = {radian: 0}
				const multiply = isDouble ? 2 : 1
				return new TWEEN.Tween(angle)
					.delay(300)
					.to({radian: -90 * multiply}, 1000)
					.easing(TWEEN.Easing.Quadratic.Out)
					.onStart(() => {
						rotationGroup.children.forEach((c) => {
							c.userData.orientation = c.userData.orientation.applyMatrix3(matrix);
						});
					})
					.onUpdate(() => {
						rotationGroup.setRotationFromAxisAngle(axis, angle.radian * Math.PI / 180)
					})
			}
			
			function animate(animation, cubeGroup, rotationGroup) {
				return new Promise((resolve, reject) => {
					animation.onComplete(function () {
						while (rotationGroup.children.length) {
							cubeGroup.attach(rotationGroup.children[rotationGroup.children.length - 1]);
						}
						setTimeout(function () {
							resolve(true);
						}, 0)
					})
				})
				
			}
			
			let play = true;
			return {
				parseOperation: parseOperation,
				async animateOperation(cubeGroup, operationString) {
					const operationArray = parseOperation(operationString);
					for (let i = 0; i < operationArray.length; i++) {
						console.log(operationArray[i])
						const rotationGroup = getRotationGroup(cubeGroup, operationArray[i], i);
						const axisAndMatrix = getAxisAndMatrix(operationArray[i]);
						const animation = generateAnimate(cubeGroup, rotationGroup, axisAndMatrix.axis, axisAndMatrix.matrix, operationArray[i].includes("2"));
						if (!play) return;
						animation.start();
						await animate(animation, cubeGroup, rotationGroup);
						cubeGroup.parent.getObjectByName("text").element.innerHTML = operationArray.map((op, idx) => {
							let returnTag = ""
							if (idx !== 0) returnTag = (idx % 11 === 0 ? "\n" : "")
							return idx <= i ? op + returnTag : null
						}).filter((op) => op != null).join("")
					}
				},
				toggleAnimate() {
					play = !play;
				},
				reverseHelper(operation) {
					let reverseOperation = null;
					if (operation.includes("'")) {
						reverseOperation = operation.replace((/'/i), "");
					} else {
						reverseOperation = operation + "'";
					}
					return reverseOperation;
				}
			}
		}
		
		// reset 함수
		// 마우스로 스티커 보이게 / 안보이게
		// 별스티커(?) 붙이기
		
	}
}(window))
