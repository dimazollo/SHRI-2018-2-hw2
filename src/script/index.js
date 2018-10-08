import classes from '../style/style.css';
import Gesture from './Gesture';
import Point from './Point';

const cameraContainer = document.querySelector('.camera-view__container');
const cameraImage = document.querySelector('.camera-view__image');
const bar = document.querySelector('.bar');
const debugInfo = document.querySelector('.debug-info');

const gesture = new Gesture();

const myPointer = {
  id: 10000,
  startPoint: new Point({x: 409, y: 249}),
  prevPoint: new Point({x: 409, y: 249}),
  prevTs: Date.now()
};
// gesture.pointers.push(myPointer);

function calcBarPosition() {
  const imageWidth = 2560;
  const xTranslate = gesture.translateParams.x;
  const containerWidth = cameraContainer.offsetWidth;
  const position = ((imageWidth / 2 + xTranslate)
    / imageWidth * containerWidth - bar.style.width / 2) % containerWidth;

  if (position < 0) {
    return position + containerWidth
  } else {
    return position;
  }
}

bar.style.left = calcBarPosition() + 'px';

cameraImage.addEventListener('pointerdown', (event) => {
  cameraImage.setPointerCapture(event.pointerId);
  gesture.handlePointerDown(event);
});

cameraImage.addEventListener('pointermove', (event) => {
  gesture.handlePointerMove(event);
  const translate = gesture.translateParams;
  cameraImage.style.backgroundPosition = `${translate.x}px ${translate.y}px`;

  const scale = gesture.scaleParams;
  cameraImage.style.transform = `scale(${scale})`;

  const brightness = gesture.brightnessParams;
  cameraImage.style.filter = `brightness(${brightness})`;

  bar.style.left = calcBarPosition() + 'px';

  // debugInfo.textContent += event.pointerId + ':' + event.type + '\n';
});

cameraImage.addEventListener('pointerup', (event) => {
  gesture.handlePointerUp(event);
  cameraImage.releasePointerCapture(event.pointerId);
});

cameraImage.addEventListener('pointercancel', (event) => {
  gesture.handlePointerCancel(event);
  cameraImage.releasePointerCapture(event.pointerId);
});
