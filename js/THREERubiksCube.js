// THREE exist check
// THREE CSS3DObject exist check

/**
* param
 * stickerColorSet : {
 *  "F" :
 *  "B" :
 *  "L" :
 *  "R" :
 *  "U" :
 *  "D" :
 *  },
 *  size : {
 *    width :
 *    height :
 *    depth :
 *  }
* */
THREE.RubiksCube = function RubiksCube(options){
    THREE.CSS3DObject.apply(this, [document.createElement("div")]);
    
    // create cube
  
    //create cubelet
    function makeBlock(width, height, depth, blockColor){
        const blockTag = document.createElement("div");
        const block = new THREE.CSS3DObject(blockTag);
        
        const fb = document.createElement("div");
        Object.assign(fb.style, {
            width : width + "px",
            height : height + "px",
            // backgroundColor : cubeletColor
            border : "1px dashed " + blockColor
        });
        const front = new THREE.CSS3DObject(fb.cloneNode(false));
        front.position.z += (depth / 2);
	      block.add(front);
        
        const back = new THREE.CSS3DObject(fb.cloneNode(false));
	      back.position.z -= (depth / 2);
	      block.add(back);
	      
	      const tb = document.createElement("div");
	      Object.assign(tb.style, {
	          width : width + "px",
            height : depth + "px",
		        border : "1px dashed " + blockColor
        });
	      const top = new THREE.CSS3DObject(tb.cloneNode(false));
	      top.position.y += (height / 2);
	      top.rotateX(90 * Math.PI / 180);
	      block.add(top);
	
        const bottom = new THREE.CSS3DObject(tb.cloneNode(false));
        bottom.position.y -= (height / 2);
	      bottom.rotateX(90 * Math.PI / 180);
	      block.add(bottom);
	      
	      const lr = document.createElement("div");
	      Object.assign(lr.style, {
	          width : depth + "px",
            height : height + "px",
            border : "1px dashed " + blockColor
        });
	      const left = new THREE.CSS3DObject(lr.cloneNode(false));
	      left.position.x -= (width / 2);
	      left.rotateY(90 * Math.PI / 180);
	      block.add(left);
	
        const right = new THREE.CSS3DObject(lr.cloneNode(false));
	      right.position.x += (width / 2);
	      right.rotateY(90 * Math.PI / 180);
	      block.add(right);
	      
        return block;
    }
    
    [-1, 0, 1].forEach((y)=>{
        [-1, 0, 1].forEach((x)=>{
            [-1, 0, 1].forEach((z)=>{
	            const block = makeBlock(options.size.width, options.size.height, options.size.depth, "black");
	            block.position.x = x * options.size.width;
	            block.position.y = y * options.size.height;
	            block.position.z = z * options.size.depth;
	            block.userData.orientation = new THREE.Vector3(x, y, z);
	            this.add(block);
            })
        })
    });
}
THREE.RubiksCube.prototype = Object.create(THREE.CSS3DObject.prototype);
THREE.RubiksCube.prototype.constructor = THREE.RubiksCube;
