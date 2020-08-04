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
        let sticker = document.createElement("div");
        Object.assign(sticker.style, {
            width : "300px",
            height : "300px",
            backgroundColor : "red",
	          borderBottomRightRadius : "150px"
        });
        
        const front = new THREE.CSS3DObject(fb.cloneNode(false).appendChild(sticker));
        front.position.z += (depth / 2);
	      block.add(front);
	      front.name = "front";
	
	      sticker = document.createElement("div");
        // Object.assign(sticker.style, {
        //     width : "300px",
        //     height : "300px",
        //     backgroundColor : "blue",
	      //     borderBottomRightRadius : "150px"
        // });
        const back = new THREE.CSS3DObject(fb.cloneNode(false).appendChild(sticker));
	      back.position.z -= (depth / 2);
	      block.add(back);
	      back.name = "back";
	    
	      const tb = document.createElement("div");
	      Object.assign(tb.style, {
	          width : width + "px",
            height : depth + "px",
		        border : "1px dashed " + blockColor
        });
        sticker = document.createElement("div");
        Object.assign(sticker.style, {
            width : "300px",
            height : "300px",
            backgroundColor : "cyan",
	          borderBottomRightRadius : "150px"
        });
	      const top = new THREE.CSS3DObject(tb.cloneNode(false).appendChild(sticker));
	      top.rotateX(90 * Math.PI / 180);
	      top.position.y += (height / 2);
	      top.name = "top";
	      block.add(top);
	
	      sticker = document.createElement("div");
        // Object.assign(sticker.style, {
        // width : "300px",
        // height : "300px",
        // backgroundColor : "green",
        // borderBottomRightRadius : "150px"
        // });
	      const bottom = new THREE.CSS3DObject(tb.cloneNode(false).appendChild(sticker));
        bottom.position.y -= (height / 2);
	      bottom.rotateX(90 * Math.PI / 180);
	      block.add(bottom);
	      bottom.name = "top";
	      
	      const lr = document.createElement("div");
	      Object.assign(lr.style, {
	          width : depth + "px",
            height : height + "px",
            border : "1px dashed " + blockColor
        });
        sticker = document.createElement("div");
        Object.assign(sticker.style, {
            width : "300px",
            height : "300px",
            backgroundColor : "purple",
	          borderBottomRightRadius : "150px"
        });
	      const left = new THREE.CSS3DObject(lr.cloneNode(false).appendChild(sticker));
	      left.position.x -= (width / 2);
	      left.rotateY(90 * Math.PI / 180);
	      left.name = "left";
	      block.add(left);
	
        sticker = document.createElement("div");
        // Object.assign(sticker.style, {
        // width : "300px",
        // height : "300px",
        // backgroundColor : "gray",
	      //   borderBottomRightRadius : "150px"
        // });
        const right = new THREE.CSS3DObject(lr.cloneNode(false).appendChild(sticker));
	      right.position.x += (width / 2);
	      right.rotateY(-90 * Math.PI / 180);
	      block.add(right);
	      right.name = "right";
	      
        return block;
    }
	  function makeBlock2(width, height, depth, blockColor){
		const blockTag = document.createElement("div");
		const block = new THREE.CSS3DObject(blockTag);
		
		const fb = document.createElement("div");
		Object.assign(fb.style, {
			width : width + "px",
			height : height + "px",
			// backgroundColor : cubeletColor
			border : "1px dashed " + blockColor
		});
		let sticker = document.createElement("div");
		Object.assign(sticker.style, {
			width : "300px",
			height : "300px",
			backgroundColor : "red",
			borderBottomLeftRadius : "150px"
		});
		
		const front = new THREE.CSS3DObject(fb.cloneNode(false).appendChild(sticker));
		front.position.z += (depth / 2);
		block.add(front);
		front.name = "front";
		
		sticker = document.createElement("div");
		// Object.assign(sticker.style, {
		//     width : "300px",
		//     height : "300px",
		//     backgroundColor : "blue",
		//     borderBottomRightRadius : "150px"
		// });
		const back = new THREE.CSS3DObject(fb.cloneNode(false).appendChild(sticker));
		back.position.z -= (depth / 2);
		block.add(back);
		back.name = "back";
		
		const tb = document.createElement("div");
		Object.assign(tb.style, {
			width : width + "px",
			height : depth + "px",
			border : "1px dashed " + blockColor
		});
		sticker = document.createElement("div");
		Object.assign(sticker.style, {
			width : "300px",
			height : "300px",
			backgroundColor : "cyan",
			borderBottomLeftRadius : "150px"
		});
		const top = new THREE.CSS3DObject(tb.cloneNode(false).appendChild(sticker));
		top.rotateX(90 * Math.PI / 180);
		top.position.y += (height / 2);
		top.name = "top";
		block.add(top);
		
		sticker = document.createElement("div");
		// Object.assign(sticker.style, {
		// width : "300px",
		// height : "300px",
		// backgroundColor : "green",
		// borderBottomRightRadius : "150px"
		// });
		const bottom = new THREE.CSS3DObject(tb.cloneNode(false).appendChild(sticker));
		bottom.position.y -= (height / 2);
		bottom.rotateX(90 * Math.PI / 180);
		block.add(bottom);
		bottom.name = "top";
		
		const lr = document.createElement("div");
		Object.assign(lr.style, {
			width : depth + "px",
			height : height + "px",
			border : "1px dashed " + blockColor
		});
		sticker = document.createElement("div");
		// Object.assign(sticker.style, {
		// 	width : "300px",
		// 	height : "300px",
		// 	backgroundColor : "purple",
		// 	borderBottomRightRadius : "150px"
		// });
		const left = new THREE.CSS3DObject(lr.cloneNode(false).appendChild(sticker));
		left.position.x -= (width / 2);
		left.rotateY(90 * Math.PI / 180);
		left.name = "left";
		block.add(left);
		
		sticker = document.createElement("div");
		Object.assign(sticker.style, {
        width : "300px",
        height : "300px",
        backgroundColor : "gray",
        borderBottomLeftRadius : "150px"
		});
		const right = new THREE.CSS3DObject(lr.cloneNode(false).appendChild(sticker));
		right.position.x += (width / 2);
		right.rotateY(-90 * Math.PI / 180);
		block.add(right);
		right.name = "right";
		
		return block;
	}
	  function makeBlock3(width, height, depth, blockColor){
		const blockTag = document.createElement("div");
		const block = new THREE.CSS3DObject(blockTag);
		
		const fb = document.createElement("div");
		Object.assign(fb.style, {
			width : width + "px",
			height : height + "px",
			// backgroundColor : cubeletColor
			border : "1px dashed " + blockColor
		});
		let sticker = document.createElement("div");
		// Object.assign(sticker.style, {
		// 	width : "300px",
		// 	height : "300px",
		// 	backgroundColor : "red",
		// 	borderBottomLeftRadius : "150px"
		// });
		
		const front = new THREE.CSS3DObject(fb.cloneNode(false).appendChild(sticker));
		front.position.z += (depth / 2);
		block.add(front);
		front.name = "front";
		
		sticker = document.createElement("div");
		Object.assign(sticker.style, {
		    width : "300px",
		    height : "300px",
		    backgroundColor : "blue",
			  borderBottomRightRadius : "150px"
		});
		const back = new THREE.CSS3DObject(fb.cloneNode(false).appendChild(sticker));
		back.position.z -= (depth / 2);
		block.add(back);
		back.name = "back";
		
		const tb = document.createElement("div");
		Object.assign(tb.style, {
			width : width + "px",
			height : depth + "px",
			border : "1px dashed " + blockColor
		});
		sticker = document.createElement("div");
		Object.assign(sticker.style, {
			width : "300px",
			height : "300px",
			backgroundColor : "cyan",
			borderTopRightRadius : "150px"
		});
		const top = new THREE.CSS3DObject(tb.cloneNode(false).appendChild(sticker));
		top.rotateX(90 * Math.PI / 180);
		top.position.y += (height / 2);
		top.name = "top";
		block.add(top);
		
		sticker = document.createElement("div");
		// Object.assign(sticker.style, {
		// width : "300px",
		// height : "300px",
		// backgroundColor : "green",
		// borderBottomRightRadius : "150px"
		// });
		const bottom = new THREE.CSS3DObject(tb.cloneNode(false).appendChild(sticker));
		bottom.position.y -= (height / 2);
		bottom.rotateX(90 * Math.PI / 180);
		block.add(bottom);
		bottom.name = "top";
		
		const lr = document.createElement("div");
		Object.assign(lr.style, {
			width : depth + "px",
			height : height + "px",
			border : "1px dashed " + blockColor
		});
		sticker = document.createElement("div");
		Object.assign(sticker.style, {
			width : "300px",
			height : "300px",
			backgroundColor : "purple",
			borderBottomLeftRadius : "150px"
		});
		const left = new THREE.CSS3DObject(lr.cloneNode(false).appendChild(sticker));
		left.position.x -= (width / 2);
		left.rotateY(90 * Math.PI / 180);
		left.name = "left";
		block.add(left);
		
		sticker = document.createElement("div");
		// Object.assign(sticker.style, {
		// 	width : "300px",
		// 	height : "300px",
		// 	backgroundColor : "gray",
		// 	borderBottomLeftRadius : "150px"
		// });
		const right = new THREE.CSS3DObject(lr.cloneNode(false).appendChild(sticker));
		right.position.x += (width / 2);
		right.rotateY(-90 * Math.PI / 180);
		block.add(right);
		right.name = "right";
		
		return block;
	}
    /**
     * x : -1 (left) , 0 , 1(right)
     * y : -1 (top), 0, 1(bottom)
     * z : -1 (front), 0, 1(back)
     * */
    /**
     *
    */
		// [-1, 0, 1].forEach((y)=>{
    //     [-1, 0, 1].forEach((x)=>{
    //         [-1, 0, 1].forEach((z)=>{
	  //           const block = makeBlock(options.size.width, options.size.height, options.size.depth, "black");
	  //           block.position.x = x * options.size.width;
	  //           block.position.y = y * options.size.height;
	  //           block.position.z = z * options.size.depth;
	  //           block.userData.orientation = new THREE.Vector3(x, y, z);
	  //           this.add(block);
    //         })
    //     })
    // });
    const block = makeBlock(options.size.width, options.size.height, options.size.depth, "black");
	  this.add(block);
	  
	  const block2 =makeBlock2(options.size.width, options.size.height, options.size.depth, "black")
	  this.add(block2);
	  block2.position.x = 600;
	
    const block3 =makeBlock3(options.size.width, options.size.height, options.size.depth, "black")
    this.add(block3);
    block3.position.z = -600;
    // //
	  // const block2 = makeBlock(options.size.width, options.size.height, options.size.depth, "black");
    // block2.rotateX(90* Math.PI / 180);
    // block2.rotateY(90* Math.PI / 180);
    // block2.rotateZ(90* Math.PI / 180);
    // block2.position.x = 600;
    // this.add(block2);
    
  //top left front
    let blk = null;
    const tlf = document.createElement("div");
	  blk = new THREE.CSS3DObject(tlf);
	  
}
THREE.RubiksCube.prototype = Object.create(THREE.CSS3DObject.prototype);
THREE.RubiksCube.prototype.constructor = THREE.RubiksCube;
