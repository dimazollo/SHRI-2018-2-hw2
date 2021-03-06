import classes from '../style/style.css';
import Gesture from './Gesture';
import Point from './Point';

const cameraContainer = document.querySelector('.camera-view__container');
const cameraImage = document.querySelector('.camera-view__image');
const bar = document.querySelector('.bar');

const scaleBlock = document.querySelector('#scale');
const brightnessBlock = document.querySelector('#brightness');

const gesture = new Gesture();

// fake pointer for debugging
const myPointer = {
  id: 10000,
  startPoint: new Point({x: 400, y: 250}),
  prevPoint: new Point({x: 400, y: 250}),
  prevTs: Date.now()
};
// gesture.pointers.push(myPointer);

const initialImageWidth = cameraImage.offsetWidth;

// Function to calculate position of "scroll-bar" in bottom of the image
function calcBarPosition() {
  const xTranslate = gesture.translateParams.x;
  const containerWidth = cameraContainer.offsetWidth;
  const position = ((initialImageWidth / 2 + xTranslate)
    / initialImageWidth * containerWidth - bar.offsetWidth / 2) % containerWidth;

  if (position < 0) {
    return position + containerWidth
  } else {
    return position;
  }
}

function calcBarWidth() {
  const containerWidth = cameraContainer.offsetWidth;
  const imageWidth = initialImageWidth * gesture.scaleParam;
  const barWidth = containerWidth / imageWidth * containerWidth;
  return barWidth;
}

// Set initial position to "scroll-bar"
bar.style.width = calcBarWidth() + 'px';
bar.style.left = calcBarPosition() + 'px';

// add listeners for pointer events
cameraImage.addEventListener('pointerdown', (event) => {
  cameraImage.setPointerCapture(event.pointerId);
  gesture.handlePointerDown(event);
});

cameraImage.addEventListener('pointermove', (event) => {
  gesture.handlePointerMove(event);

  const translate = gesture.translateParams;
  cameraImage.style.backgroundPosition = `${translate.x}px ${translate.y}px`;

  const scale = gesture.scaleParam;
  cameraImage.style.transform = `scale(${scale})`;

  const brightness = gesture.brightnessParam;
  cameraImage.style.filter = `brightness(${brightness})`;

  bar.style.width = calcBarWidth() + 'px';
  bar.style.left = calcBarPosition() + 'px';

  scaleBlock.textContent = Math.floor(scale * 100) + '%';
  brightnessBlock.textContent = Math.floor(brightness * 100) + '%';
});

cameraImage.addEventListener('pointerup', (event) => {
  gesture.handlePointerUp(event);
  cameraImage.releasePointerCapture(event.pointerId);
});

cameraImage.addEventListener('pointercancel', (event) => {
  gesture.handlePointerCancel(event);
  cameraImage.releasePointerCapture(event.pointerId);
});
