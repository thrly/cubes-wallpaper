// generate cube stacks
// thrly

// uses colours from Catppucin Mocha
const colours = [
  "#b4befe",
  "#89dceb",
  "#74c7ec",
  "#a6e3a1",
  "#f9e2af",
  "#fab387",
  "#f38ba8",
  "#eba0ac",
  "#cba6f7",
  "#f5c2e7",
  "#f2cdcd",
  "#f5e0dc",
];

const recMode = false;
const recFrames = 25; // number of frames to render;

let cam;
let stack = [];
const nBlocks = 4;
const blockSize = 80;
const spacing = 1.15;
const noiseToDrawThresh = 0.5;
const randToColThresh = 0.06;

const backgd = "#313244"; // background color
const blankBlock = "#cdd6f4"; // 'empty' block colour

const strk = "#585b70"; // stroke colour

function setup() {
  setAttributes("antialias", true);

  strokeWeight(2);

  createCanvas(1920, 1080, WEBGL); // HD
  // createCanvas(1080, 1920, WEBGL); // HD portrait

  // createCanvas(3840, 2160, WEBGL); //4k
  
  cam = createCamera(); // Create a p5.Camera object.
  cam.camera();
  cam.setPosition(700, -400, 700); // Move the camera to the top-right.
  cam.lookAt(0, 0, 0);
}

function draw() {
  stack = [];
  frameRate(3);

  for (let x = 1; x <= nBlocks; x++) {
    for (let y = 1; y <= nBlocks; y++) {
      for (let z = 1; z <= nBlocks; z++) {
        let x_loc = x * blockSize * spacing - blockSize * nBlocks;
        let y_loc = y * blockSize * spacing - blockSize * nBlocks * 0.75; // 0.75 to bodge the center...
        let z_loc = z * blockSize * spacing - blockSize * nBlocks;

        let block = new Stack(x_loc, y_loc, z_loc);
        let t = random(100) + (frameCount % 100);
        let noiseVal = noise(x * t, y * t, z * t);
        if (noiseVal > noiseToDrawThresh) {
          stack.push(block);
        }
      }
    }
  }

  background(backgd);
  for (let block of stack) {
    block.show();
  }

  if (recMode) {
    save("wallpaper/cubuccin-" + frameCount + ".png");

    if (frameCount === recFrames) {
      exit();
    }
  }
}

class Stack {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;

    // set block color
    if (random() < randToColThresh) {
      this.colour =
        colours[Math.floor(random() * colours.length)];
    } else {
      this.colour = color(blankBlock);
    }
  }

  show() {
    push();
    stroke(strk);
    fill(this.colour);
    translate(this.x, this.y, this.z);
    box(blockSize);
    pop();
  }
}
