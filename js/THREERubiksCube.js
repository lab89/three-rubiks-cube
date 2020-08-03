// THREE exist check
// THREE CSS3DObject exist check

THREE.RubiksCube = function RubiksCube(options){
    THREE.CSS3DObject.apply(this, [document.createElement("div")]);
    
    const commonStyle = {
        position : "absolute",
        border : "1px solid black",
        width : "160px",
        height : "160px"
    }

    const cubelet = document.createElement("div");

    
}
THREE.RubiksCube.prototype = Object.create(THREE.CSS3DObject.prototype);
THREE.RubiksCube.prototype.constructor = THREE.RubiksCube;
