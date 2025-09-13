let cnv;
let objs = [];
let grd;

function preload() {
  grd = loadImage("g16.png");
  objs[0] = loadImage("b1.png");
  objs[1] = loadImage("b2.png");
  objs[2] = loadImage("b3.png");
  objs[3] = loadImage("b4.png");
  objs[4] = loadImage("b5.png");
  objs[5] = loadImage("p2.png");
}

function setup() {
  cnv = createCanvas(900, 900);
  let cx = (windowWidth - width) / 2;
  let cy = (windowHeight - height) / 2;
  cnv.position(cx, cy);
  grd.resize(900, 900);
  for (let i = 0; i < objs.length; i++) {
    print(i, objs[i]);

    objs[i].resize(100, 0);
    objs[i].filter(INVERT);
  }
  background(0);

  imageMode(CENTER);
  image(objs[0], 450, 450);
  grd.filter(INVERT);
  imageMode(CORNER);
  image(grd, 0, 0);
}
