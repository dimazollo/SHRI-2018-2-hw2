import '../style/style.css';
import Point from './Point';
import Gesture from './Gesture';

const cameraContainer: HTMLElement | null = document.querySelector('.camera-view__container');
const cameraImage: HTMLElement | null = document.querySelector('.camera-view__image');
const bar: HTMLElement | null = document.querySelector('.bar');

const scaleBlock: HTMLElement | null = document.querySelector('#scale');
const brightnessBlock: HTMLElement | null = document.querySelector('#brightness');

const gesture = new Gesture();

// fake pointer for debugging
const myPointer = {
  id: 10000,
  startPoint: new Point(400, 250),
  prevPoint: new Point(400, 250),
  prevTs: Date.now()
};
// gesture.pointers.push(myPointer);
if (cameraImage && cameraContainer && bar && scaleBlock && brightnessBlock) {
  const initialImageWidth = cameraImage.offsetWidth;

// Function to calculate position of "scroll-bar" in bottom of the image
  function calcBarPosition(cameraContainer: HTMLElement, bar: HTMLElement) {
    const xTranslate = gesture.translateParams.x;
    const containerWidth = cameraContainer.offsetWidth!;
    const position = ((initialImageWidth / 2 + xTranslate)
      / initialImageWidth * containerWidth - bar.offsetWidth / 2) % containerWidth;

    if (position < 0) {
      return position + containerWidth
    } else {
      return position;
    }
  }

  function calcBarWidth(cameraContainer: HTMLElement) {
    const containerWidth = cameraContainer.offsetWidth;
    const imageWidth = initialImageWidth * gesture.scaleParam;
    const barWidth = containerWidth / imageWidth * containerWidth;
    return barWidth;
  }

// Set initial position to "scroll-bar"
  bar.style.width = calcBarWidth(cameraContainer) + 'px';
  bar.style.left = calcBarPosition(cameraContainer, bar) + 'px';

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

    bar.style.width = calcBarWidth(cameraContainer) + 'px';
    bar.style.left = calcBarPosition(cameraContainer, bar) + 'px';

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
}
