import * as THREE from 'three';
import {CSS3DRenderer, CSS3DObject} from 'three/examples/jsm/renderers/CSS3DRenderer'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import RubiksCube from './RubiksCube'

var camera, scene, renderer, controls;

init();
animate();

function init(){
	camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000000);
	camera.position.x = 3000;
	camera.position.z = 3000;
	camera.position.y = 3000;
	
	scene = new THREE.Scene();
	
	renderer = new CSS3DRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.getElementById("container").appendChild(renderer.domElement);
	
	// const test= new CSS3DObject(document.createElement("div"));
	
	const cube = new RubiksCube(
		{
			blockColor : "black",
			size : {
				width : 300,
				height : 300,
				depth : 300
			},
			stickerColorSet : {
				"f": "rgba(42, 249, 107, 1)",
				"b": "rgba(5, 34, 174, 1)",
				"l": "rgba(225, 10, 28, 1)",
				"r": "rgba(252, 77, 30, 1)",
				"u": "rgba(230, 245, 252, 1)",
				"d": "rgba(235, 253, 57, 1)",
			},
			fitment : "fitted",
			mirror : true,
			hoverEnabled : true,
			clickEnabled : true,
			hoverColor : "red",
			clickColor : "black",
			animateDuration : 1000
		});
	
	scene.add(cube);	
	

	cube.animate("FRUD");
	// cube.addEventListener("operationCompleted", function(){		
	// 	// cube.options.stickerColorSet["f"] = "black";
	// 	cube.refreshCube();
	// });

	setTimeout(function(){
		// cube.options.stickerColorSet["f"] = "black";
		// cube.options.blockColor = "white";
		cube.refreshCube();
		cube.animate("B");

		console.log(cube);
	}, 5000)
	
	controls = new OrbitControls(camera, renderer.domElement);
	controls.enableZoom = true;
	controls.enablePan = false;
	controls.minDistance = 500;
	controls.maxDistance = 10000;
	controls.addEventListener("change", function (e) {
		console.log("change");
	});
	
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	
	renderer.setSize(window.innerWidth, window.innerHeight);
	
	render();
}

function animate(time) {
	requestAnimationFrame(animate);
	controls.update();
	render();
}

function render() {
	renderer.render(scene, camera);
}
