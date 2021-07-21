/**
 * 3*3*3
 * ---------------------
 * | luf | xuf  | X |
 * | lxf | xxf  | X | 
 * | ldf | xdf  | X |
 * ---------------------
 *  operation
 *  90Deg : l -> f -> r -> b
 *          u, d, x -> u, d, x
 */

const Cube333Pack = {
  blocks : [
    ["l/u/f", "r/u/f", "r/u/b", "l/u/b"],
    ["l/d/f", "r/d/f", "r/d/b", "l/d/b"],
    ["l/x/f", "r/x/f", "r/x/b", "l/x/b"],
    ["x/d/f", "r/d/x", "x/d/b", "l/d/x"],
    ["x/u/f", "r/u/x", "x/u/b", "l/u/x"],
    ["x/x/f", "r/x/x", "x/x/b", "l/x/x"],
    ["x/u/x"],
    ["x/d/x"]
  ],
  stickers : {
    "luf" : ["borderBottomRightRadius"],
    "ldf" : ["borderTopRightRadius"],
    "lxf" : ["borderTopRightRadius", "borderBottomRightRadius"],
    "xdf" : ["borderTopRightRadius", "borderTopLeftRadius"],
    "xuf" : ["borderBottomRightRadius", "borderBottomLeftRadius"]
  },
  coordInfo : {
    "x" : 0,
    "l" : -1,
    "r" : 1,
    "f" : 1,
    "b" : -1,
    "u" : -1,
    "d" : 1
  }
}
/**
 * 4*4*4
 * -------------------------------
 * | luf  | x-uf  | x+uf  | X |
 * | lx-f | x-x-f | x+x-f | X |
 * | lx+f | x-x+f | x+x+f | X |
 * | ldf  | x-df  | x+df  | X |
 *  operation
 *  90Deg : l -> f -> r -> b
 *          u, d, x-, x+ -> u, d, x, x+
 */
const Cube444Pack = {
  blocks : [
    ["l/u/f", "f/u/r", "r/u/b", "l/u/b"],
    ["l/x-/f", "", "", ""],
    ["l/x+/f", "", "", ""],
    ["l/d/f", "", "", ""],
    ["x-/u/f", "", "", ""],
    ["x-/x-/f", "", "", ""],
    ["x-/x+/f", "", "", ""],
    ["x-/d/f", "", "", ""],
    ["x+/u/f", "", "", ""],
    ["x+/x-/f", "", "", ""],
    ["x+/x+/f", "", "", ""],
    ["x+/d/f", "", "", ""],
  ],
  stickers : {
    "luf" : ["borderBottomRightRadius"],
    "ldf" : ["borderTopRightRadius"],
    "lx-f" : ["borderTopRightRadius", "borderBottomRightRadius"],
    "lx+f" : ["borderTopRightRadius", "borderBottomRightRadius"],
    "x-uf" : ["borderBottomLeftRadius", "borderBottomRightRadius"],
    "x+uf" : ["borderBottomLeftRadius", "borderBottomRightRadius"],
    "x-df" : ["borderTopLeftRadius", "borderTopRightRadius"],
    "x+df" : ["borderTopLeftRadius", "borderTopRightRadius"]
  },
  coordInfo : {
    "x-" : -0.5,
    "x+" : 0.5,
    "l" : -1,
    "r" : 1,
    "f" : 1,
    "b" : -1,
    "u" : -1,
    "d" : 1
  }
}
/**
 * 5*5*5
 * -------------------------------------
 * | luf | x-uf  | xuf  | x+uf  | X |
 * | lx-f| x-x-f | xx-f | x+x-f | X |
 * | lxf | x-xf  | xxf  | x+xf  | X |
 * | lx+f| x-x+f | xx+f | x+x+f | X |
 * | ldf | x-df  | xdf  | x+df  | X |
 *  operation
 *  90Deg : l -> f -> r -> b
 *          u, d, x-, x+, x--, x++ -> u, d, x, x+, x--, x++
 */
const Cube555Pack = {
  blocks : [
    ["l/u/f", "f/u/r", "r/u/b", "l/u/b"],
    ["l/x-/f", "f/x-/r", "r/x-/b", "b/x-/l"],
    ["l/x/f", "", "", ""],
    ["l/x+/f", "", "", ""],
    ["l/d/f", "", "", ""],
    ["x-/u/f", "", "", ""],
    ["x-/x-/f", "", "", ""],
    ["x-/x/f", "", "", ""],
    ["x-/x+/f", "", "", ""],
    ["x-/d/f", "", "", ""],
    ["x/u/f", "", "", ""],
    ["x/x-/f", "", "", ""],
    ["x/x/f", "", "", ""],
    ["x/x+/f", "", "", ""],
    ["x/d/f", "", "", ""],
    ["x+/u/f", "", "", ""],
    ["x+/x-/f", "", "", ""],
    ["x+/x/f", "", "", ""],
    ["x+/x+/f", "", "", ""],
    ["x+/d/f", "", "", ""],
  ],
  stickers : {
    "luf" : [],
    "lx-f" : [],
    "lxf" : [],
    "lx+f" : [],
    "ldf" : [],
    "x-uf" : [],
    "xuf" : [],
    "x+uf" : [],
    "x-df" : [],
    "xdf" : [],
    "x+df" : [],
  },
  coordInfo : {
    "x-" : -0.5,
    "x" : 0,
    "x+" : 0.5,
    "l" : -1,
    "r" : 1,
    "f" : 1,
    "b" : -1,
    "u" : -1,
    "d" : 1
  }
}
/**
 * 6*6*6
 * ------------------------------------------------------
 * | luf   | x--uf   | x-uf   | x+uf   | x++uf   | X |
 * | lx--f | x--x--f | x-x--f | x+x--f | x++x-f  | X |
 * | lx-f  | x--x-f  | x-x-f  | x+x-f  | x++x-f  | x |
 * | lx+f  | x--x+f  | x-x+f  | x+x+f  | x+~x+f  | X |
 * | lx++f | x--x++f | x-x++f | x+x++f | x++x++f | X |
 * | ldf   | x--df   | x-df   | x+df   | x++df   | X |
 *  operation
 *  90Deg : l -> f -> r -> b
 *          u, d, x-, x+, x--, x++ -> u, d, x, x+, x--, x++ 
 */
const Cube666Pack = {
  blocks : [
    ["l/u/f", "f/u/r", "r/u/b", "l/u/b"],
    ["l/x--/f", "", "", ""],
    ["l/x-/f", "", "", ""],
    ["l/x+/f", "", "", ""],
    ["l/x++/f", "", "", ""],
    ["l/d/f", "", "", ""],
    ["x--/u/f", "", "", ""],
    ["x--/x--/f", "", "", ""],
    ["x--/x-/f", "", "", ""],
    ["x--/x+/f", "", "", ""],
    ["x--/x++/f", "", "", ""],
    ["x--/d/f", "", "", ""],
    ["x-/u/f", "", "", ""],
    ["x-/x--/f", "", "", ""],
    ["x-/x-/f", "", "", ""],
    ["x-/x+/f", "", "", ""],    
    ["x-/x++/f", "", "", ""],
    ["x-/d/f", "", "", ""],
    ["x+/u/f", "", "", ""],
    ["x+/x--/f", "", "", ""],
    ["x+/x-/f", "", "", ""],
    ["x+/x+/f", "", "", ""],
    ["x+/x++/f", "", "", ""],
    ["x+/d/f", "", "", ""],
    ["x++/u/f", "", "", ""],
    ["x++/x-/f", "", "", ""],
    ["x++/x-/f", "", "", ""],
    ["x++/x+/f", "", "", ""],
    ["x++/x++/f", "", "", ""],
    ["x++/d/f", "", "", ""]
  ],
  stickers : {
    "luf" : [],
    "lx--f" : [],
    "lx-f" : [],
    "lx+f" : [],
    "lx++f" : [],
    "ldf" : [],
    "x--uf" : [],
    "x-uf" : [],
    "x+uf" : [],
    "x++uf" : [],
    "x--df" : [],
    "x-df" : [],
    "x+df" : [],
    "x++df" : []
  },
  coordInfo : {
    "x--" : -0.5,
    "x++" : 0.5,
    "x-" : -0.25,
    "x+" : 0.25,
    "l" : -1,
    "r" : 1,
    "f" : 1,
    "b" : -1,
    "u" : -1,
    "d" : 1
  }
}
/**
 * 7*7*7
 * ------------------------------------------------------
 * | luf   | x--uf   | x-uf   | xuf   | x+uf   | x++uf   | X |
 * | lx--f | x--x--f | x-x--f | xx--f | x+x--f | x++x-f  | X |
 * | lx-f  | x--x-f  | x-x-f  | xx-f  | x+x-f  | x++x-f  | x |
 * | lxf   | x--xf   | x-xf   | xxf   | x+xf   | x++xf   | x |
 * | lx+f  | x--x+f  | x-x+f  | xx+f  | x+x+f  | x+~x+f  | X |
 * | lx++f | x--x++f | x-x++f | xx++f | x+x++f | x++x++f | X |
 * | ldf   | x--df   | x-df   | xdf   | x+df   | x++df   | X |
 *  operation
 *  90Deg : l -> f -> r -> b
 *          u, d, x-, x+, x--, x++ -> u, d, x, x+, x--, x++ 
 */
const Cube777Pack = {
  blocks : [
    ["l/u/f", "", "", ""],
    ["l/x--/f", "", "", ""],
    ["l/x-/f", "", "", ""],
    ["l/x/f", "", "", ""],
    ["l/x+/f", "", "", ""],
    ["l/x++/f", "", "", ""],
    ["l/d/f", "", "", ""],

    ["x--/u/f", "", "", ""],
    ["x--/x--/f", "", "", ""],
    ["x--/x-/f", "", "", ""],
    ["x--/x/f", "", "", ""],
    ["x--/x+/f"], "", "", "",
    ["x--/x++/f", "", "", ""],
    ["x--/d/f", "", "", ""],
    
    ["x-/u/f", "", "", ""],
    ["x-/x--/f", "", "", ""],
    ["x-/x-/f", "", "", ""],
    ["x-/x/f", "", "", ""],
    ["x-/x+/f", "", "", ""],
    ["x-/x++/f", "", "", ""],
    ["x-/d/f", "", "", ""]
    
    ["x/u/f", "", "", ""],
    ["x/x--/f", "", "", ""],
    ["x/x-/f", "", "", ""],
    ["x/x/f", "", "", ""],
    ["x/x+/f", "", "", ""],
    ["x/x++/f", "", "", ""],
    ["x/d/f", "", "", ""],
    
    ["x+/u/f", "", "", ""],
    ["x+/x--/f", "", "", ""],
    ["x+/x-/f", "", "", ""],
    ["x+/x/f", "", "", ""],
    ["x+/x+/f", "", "", ""],
    ["x+/x++/f", "", "", ""],
    ["x+/d/f", "", "", ""],

    ["x++/u/f", "", "", ""],
    ["x++/x--/f", "", "", ""],
    ["x++/x-/f", "", "", ""],
    ["x++/x/f", "", "", ""],
    ["x++/x+/f", "", "", ""],
    ["x++/x++/f", "", "", ""],
    ["x++/d/f", "", "", ""]
  ],
  stickers : {
    "luf" : [],
    "lx--f" : [],
    "lx-f" : [],
    "lxf" : [],
    "lx+f" : [],
    "lx++f" : [],
    "ldf" : [],
    "x--uf" : [],
    "x-uf" : [],
    "xuf" : [],
    "x+uf" : [],
    "x++uf" : [],
    "x--df" : [],
    "x-df" : [],
    "xdf" : [],
    "x+df" : [],
    "x++df" : []
  },
  coordInfo : {
    "x--" : -0.5,
    "x++" : -0.5,
    "x-" : -0.25,
    "x" : 0,
    "x+" : 0.25,
    "l" : -1,
    "r" : 1,
    "f" : 1,
    "b" : -1,
    "u" : -1,
    "d" : 1
  }
}
export {Cube333Pack, Cube444Pack, Cube555Pack, Cube666Pack, Cube777Pack}