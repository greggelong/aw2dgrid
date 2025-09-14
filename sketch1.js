let cnv;
let objs = [];
let grd;
let toglines = false; // to show guid lines

let positions = []; // current positions
let targets = []; // target positions
let t = 0; // interpolation amount 0..1
let moving = true; // whether we’re sliding or pausing
let pauseTime = 2000; // milliseconds to pause
let lastMoveTime = 0;

function preload() {
  grd = loadImage("g16.png");
  objs[0] = loadImage("b1.png");
  objs[1] = loadImage("b2.png");
  objs[2] = loadImage("b3.png");
  objs[3] = loadImage("b1.png");
  objs[4] = loadImage("b3.png");
  objs[5] = loadImage("p2.png");
  objs[6] = loadImage("p.png");
  objs[7] = loadImage("m.png");
  objs[8] = loadImage("m2.png");
  objs[9] = loadImage("m3.png");
  objs[9] = loadImage("w.png");
}

function setup() {
  cnv = createCanvas(900, 900);
  let cx = (windowWidth - width) / 2;
  let cy = (windowHeight - height) / 2;
  cnv.position(cx, cy);

  grd.resize(900, 900);

  for (let i = 0; i < objs.length; i++) {
    objs[i].resize(100, 0);
    // objs[i].filter(INVERT);
  }

  // starting positions
  positions = generatePositions(objs.length);
  // first target
  targets = generatePositions(objs.length);

  imageMode(CENTER);
  grd.filter(INVERT);
}

function draw() {
  background(0);
  // drawGrid
  imageMode(CORNER);
  image(grd, 0, 0);

  // --- handle movement or pause ---
  if (moving) {
    t += 0.01; // speed of sliding
    if (t >= 1) {
      t = 1;
      moving = false;
      lastMoveTime = millis();
    }
  } else {
    if (millis() - lastMoveTime > pauseTime) {
      // pick new targets
      positions = [...targets]; // lock current as start
      targets = generatePositions(objs.length);
      t = 0;
      moving = true;
    }
  }
  // toggle lines
  if (toglines) {
    // --- draw lines connecting-
    for (let i = 0; i < objs.length; i++) {
      strokeWeight(3);
      let clr = map(i, 0, 8, 128, 255);
      stroke(0, clr, clr);
      let x = lerp(positions[i].x, targets[i].x, t);
      let y = lerp(positions[i].y, targets[i].y, t);
      stroke(clr, 0, 0);
      line(positions[i].x, positions[i].y, targets[i].x, targets[i].y);
      stroke(0, clr, clr);
      line(x, y, targets[i].x, targets[i].y);
    }
  }

  // --- draw images ---
  imageMode(CENTER);
  for (let i = 0; i < objs.length; i++) {
    let x = lerp(positions[i].x, targets[i].x, t);
    let y = lerp(positions[i].y, targets[i].y, t);
    image(objs[i], x, y);
  }
}

// generate non-overlapping positions inside safe bounds
function generatePositions(n) {
  let arr = [];
  let maxTries = 500;
  for (let i = 0; i < n; i++) {
    let placed = false;
    let tries = 0;
    while (!placed && tries < maxTries) {
      // leave margin of 50 px (half image size)
      let x = random(50, width - 50);
      let y = random(50, height - 50);
      if (noOverlap(x, y, arr, 100)) {
        arr.push({ x, y });
        placed = true;
      }
      tries++;
    }
  }
  return arr;
}

// overlap check
function noOverlap(x, y, arr, minDist) {
  for (let p of arr) {
    if (dist(x, y, p.x, p.y) < minDist) {
      return false;
    }
  }
  return true;
}

function mouseClicked() {
  if (toglines) {
    toglines = false;
  } else {
    toglines = true;
  }
}
