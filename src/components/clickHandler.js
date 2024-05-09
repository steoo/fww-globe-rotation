import * as THREE from 'three';

// Assuming you already have 'renderer', 'camera', and 'scene' set up
// and 'beltMesh' added to your scene

// 1. Track mouse position
export const mouse = new THREE.Vector2();

// 2. Setup raycaster
export const raycaster = new THREE.Raycaster();

// Function to update mouse position
export function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

// 3. Add a click event listener
export function onClick(scene, camera, meshClicked, callback) {
  console.log('onClick MeshClicked', meshClicked, meshClicked.id);
  // Update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);

  // Calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects([meshClicked], true);

  console.log(intersects);

  for (let i = 0; i < intersects.length; i += 1) {
    // 4. Check for 'meshClicked' intersection
    if (intersects[i].object === meshClicked) {
      // 5. Do something when 'meshClicked' is clicked
      console.log('meshClicked interesected!', meshClicked, meshClicked.id);
      // Implement your functionality here
      if (callback) {
        callback();
      }
      break; // Assuming you only want the first intersection
    }
  }
}

// do not remove this or the click won't be precise on the meshes
window.addEventListener('mousemove', onMouseMove, false);
