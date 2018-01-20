
import createREGL from 'regl';

import FragmentShader from './main.frag';
import VertexShader from './main.vert';


let regl;
let mouse = { x: 0, y: 0 };


const drawSquare = (regl) => regl({
  frag: FragmentShader,
  vert: VertexShader,

  attributes: {
    position: [
      [-.8, .8],
      [.8, -.8],
      [.8, .8],

      [-.8, .8],
      [-.8, -.8],
      [.8, -.8],
    ],
  },

  uniforms: {
    time: (context) => context.time,
    resolution: (context) => [
      context.viewportWidth,
      context.viewportHeight,
    ],
    color: (context, props, batchId) => [
      props.color[0],
      props.color[1],
      (context.tick % 255) / 255,
      1.,
    ],
    mouse: () => [mouse.x, mouse.y],
  },

  count: 6,
});


const drawFrame = () => {
  regl.clear({
    depth: 1,
    color: [0., 0., 0., 1.],
  });

  drawSquare(regl)({
    color: [1., 0., 0., 1.],
  });
};


const updateMousePosition = (event) => {
  const { x, y } = event;
  mouse = { x, y };
};


const init = () => {
  mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  regl = createREGL();
  regl.frame(drawFrame);

  document.addEventListener('mousemove', updateMousePosition);
};


document.addEventListener('DOMContentLoaded', () => {
  init();
});
