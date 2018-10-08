import classes from '../style/style.css';
import Gesture from './Gesture';

const camera = document.querySelector('.camera-view__image');
const debugInfo = document.querySelector('.debug-info');

const gesture = new Gesture();

const myPointer = {
  id: 10000,
  startPoint: {
    x: 409,
    y: 249
  },
  prevPoint: {
    x: 409,
    y: 249
  },
  prevTs: Date.now()
};

gesture.pointers.push(myPointer);
// const translateParams = { x: 0, y: 0 };
// const sizeParams = { x: camera.offsetWidth, y: camera.offsetHeight };


camera.addEventListener('pointerdown', (event) => {
  camera.setPointerCapture(event.pointerId);
  gesture.handlePointerDown(event);
  debugInfo.textContent += event.pointerId + ':' + event.type + '\n';

  // console.log(event);
  // camera.style.transition = 'none';

  // if (pointers.length === 1) {
  //   startDistance = calcDistance(pointers[0].prevPoint, event )
  // }
});

camera.addEventListener('pointermove', (event) => {
  console.log(event.pointerId);

  gesture.handlePointerMove(event);
  const translate = gesture.translateParams;
  camera.style.backgroundPosition = `${translate.x}px ${translate.y}px`;
  const size = gesture.sizeParams;
  camera.style.backgroundSize = `${size.x}px ${size.y}px`;
  const brightness = gesture.brightnessParams;
  camera.style.filter = `brightness(${brightness})`;
  // debugInfo.textContent += event.pointerId + ':' + event.type + '\n';


  // const currentPointer = pointers.filter(pointer => event.pointerId === pointer.id)[0];
  // if (currentPointer) {
  //   currentPointer.prevPoint.x = event.x;
  //   currentPointer.prevPoint.y = event.y;
  // }
  //
  // if (pointers.length === 1) {
  //   const activePointer = pointers[0];
  //   if (activePointer.id !== event.pointerId) {
  //     return;
  //   } else {
  //
  //     const delta = {
  //       x: event.x - activePointer.prevPoint.x,
  //       y: event.y - activePointer.prevPoint.y
  //     };
  //
  //     translateParams.x += delta.x;
  //     translateParams.y += delta.y;
  //     // debugger;
  //     camera.style.backgroundPosition = `${translateParams.x}px ${translateParams.y}px`;
  //   }
  // }
  //
  // if (pointers.length >= 2) {
  //   const firstPointer = pointers.filter(pointer => pointer.id = event.pointerId)[0];
  //   const secondPointer = firstPointer.id === pointers[1] ? pointers[0] : pointers[1];
  //
  //   const newDistance = calcDistance(firstPointer.prevPoint, secondPointer.prevPoint);
  //
  //   const delta = newDistance - startDistance;
  //   console.log('delta - ' + delta);
  //   startDistance = newDistance;
  //
  //   const aspectRatio = 2560 / 1600;
  //
  //   sizeParams.x += delta;
  //   sizeParams.y += delta / aspectRatio;
  //   camera.style.backgroundSize = `${sizeParams.x}px ${sizeParams.y}px`;
  // }
});

camera.addEventListener('pointerup', (event) => {
  gesture.handlePointerUp(event);
  camera.releasePointerCapture(event.pointerId);

  debugInfo.textContent += event.pointerId + ':' + event.type + '\n';
});

camera.addEventListener('pointercancel', (event) => {
  gesture.handlePointerCancel(event);
  camera.releasePointerCapture(event.pointerId);

  debugInfo.textContent += event.pointerId + ':' + event.type + '\n';
});

