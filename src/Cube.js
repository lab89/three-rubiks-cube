import * as THREE from 'three';
import {CSS3DObject} from 'three/examples/jsm/renderers/CSS3DRenderer'
const NNNCube = function NNNCube(){
	THREE.Group.apply(this);
};
NNNCube.prototype = Object.create(THREE.Group.prototype);
NNNCube.prototype.constructor = NNNCube;

const RubiksCube = function(){
  NNNCube.apply(this);
}