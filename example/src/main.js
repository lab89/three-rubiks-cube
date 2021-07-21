import * as THREE from 'three';
import {CSS3DRenderer, CSS3DObject} from 'three/examples/jsm/renderers/CSS3DRenderer'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import RubiksCube from './RubiksCube'

var camera, scene, renderer, controls, cube;

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
	
	cube = new RubiksCube(
		{
			blockColor : "black",
			size : 200,
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
			clickColor : "cyan",
			animateDuration : 1000
		});
	
	scene.add(cube);		

	cube.operateWidthAnimation("UDRLFBudrlfbxyzMESS'E'M'z'y'x'b'f'l'r'd'u'B'F'L'R'D'U'")
	
	
	controls = new OrbitControls(camera, renderer.domElement);
	controls.enableZoom = true;
	controls.enablePan = false;
	controls.minDistance = 500;
	controls.maxDistance = 10000;
  
  window.addEventListener('resize', onWindowResize)
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();	
	renderer.setSize(window.innerWidth, window.innerHeight);	
}

function animate(time) {
	requestAnimationFrame(animate);
	render();
}

function render() {
	renderer.render(scene, camera);
}
