import * as THREE from 'three';
import GUI from 'lil-gui';
import { gsap } from 'gsap';
import OrbitControls from './utils/OrbitControls';
import createAndAddText from './components/text';
import createAndAddLogo from './components/logo-texture';
import {
  onClick, onMouseMove, mouse, raycaster,
} from './components/clickHandler';
import './style/index.css';
import './style/font.css';
import createAndAddPrinciples from './components/principles';

async function setupScene() {
  // Initialize the scene, camera, and renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xffffff, 0);

  document.getElementById('globeContainer').appendChild(renderer.domElement);

  const vFOV = THREE.MathUtils.degToRad(camera.fov); // Convert to radians
  const hFOV = 2 * Math.atan(Math.tan(vFOV / 2) * camera.aspect);

  let limitFov = vFOV;

  if (camera.aspect < 1) {
    limitFov = hFOV;
  }

  const minDistance = 1;
  const maxDistance = 10.5 / Math.sin(limitFov / 2);

  const controls = new OrbitControls(camera, renderer.domElement);

  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = true;
  controls.enabled = true;
  controls.enableZoom = true;
  controls.enablePan = true;
  controls.enableRotate = true;
  controls.minPolarAngle = Math.PI / 2;
  controls.maxPolarAngle = Math.PI / 2;
  controls.minDistance = minDistance;
  controls.maxDistance = maxDistance;
  controls.rotateSpeed = 1;
  controls.autoRotate = false;
  controls.autoRotateSpeed = 0.5;

  controls.listenToKeyEvents(window);

  // If we want to set the panning on the left.
  // Check for touch
  controls.mouseButtons = {
    LEFT: 2,
    MIDDLE: 1,
    RIGHT: 0,
  };

  const globeGeometry = new THREE.SphereGeometry(10, 32, 32);

  // Create a wireframe material
  const globeMaterial = new THREE.MeshBasicMaterial({
    color: 0xcccccc,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
    depthTest: true,
  });

  // Create a mesh with the geometry and material
  const globeMesh = new THREE.Mesh(globeGeometry, globeMaterial);
  scene.add(globeMesh);

  // Position the camera
  camera.position.x = 0;
  camera.position.z = maxDistance;
  camera.updateProjectionMatrix();

  const {
    beltMesh,
  } = createAndAddText();
  const principleMesh = await createAndAddPrinciples(scene);
  const imageBeltMesh = await createAndAddLogo();

  // const helper = new THREE.AxesHelper(10);
  // imageBeltMesh.add(helper);

  globeMesh.position.set(0, 0, 0);

  const globeMeshBoxHelper = new THREE.BoxHelper(globeMesh, 0x0000ff);
  // const imageMeshBoxHelper = new THREE.BoxHelper(imageBeltMesh, 0x0000ff);

  scene.add(globeMesh);
  scene.add(beltMesh);
  scene.add(imageBeltMesh);
  // scene.add(principleMesh);
  scene.add(globeMeshBoxHelper);

  // smooth programmatic zoom
  function smoothZoom(targetDistance, duration = 2000) {
    const startDistance = controls.target.distanceTo(camera.position);
    const targetVector = new THREE.Vector3().copy(controls.target); // Get a copy of the target position
    const directionVector = camera.position.clone().sub(targetVector).normalize(); // Direction from target to camera

    targetDistance = Math.max(minDistance, Math.min(maxDistance, targetDistance));
    // const startTime = performance.now();

    function animateZoom() {
      const animationObject = { currentDistance: startDistance };

      gsap.fromTo(
        animationObject,
        { currentDistance: startDistance }, // Starting state
        { // Ending state
          currentDistance: targetDistance,
          duration: duration / 1000, // GSAP uses seconds instead of milliseconds
          ease: 'power2.inOut', // This uses GSAP's built-in "easeInOut" power2 curve
          onUpdate() {
            camera.position.copy(targetVector).add(directionVector.clone().multiplyScalar(animationObject.currentDistance)); // Set new camera position
            // console.log('new camera position on update', camera.position, animationObject.currentDistance, this);
            controls.update();
          },
          onComplete: () => {
            camera.position.copy(targetVector).add(directionVector.multiplyScalar(targetDistance));
            controls.update();
          },
        },
      );
    }
    animateZoom();
  }

  // panning on cursor moving
  window.addEventListener('mousemove', (event) => {
    const obj = {};
    const multiplier = 10;
    obj.clientX = (event.clientX / window.innerWidth) * multiplier;
    obj.clientY = (event.clientY / window.innerHeight) * multiplier;

    // console.log(obj);
    // controls.handleMouseMovePan(obj);
  }, false);

  window.addEventListener(
    'click',
    () => onClick(scene, camera, beltMesh, () => {
      // Usage: zoom in to twice the distance from the current target
      smoothZoom(principleMesh.position.z + minDistance, 1000);
    }),
    false,
  );

  window.addEventListener(
    'click',
    () => onClick(scene, camera, imageBeltMesh, () => {
      // Usage: zoom in to twice the distance from the current target
      smoothZoom(minDistance, 1000);
    }),
    false,
  );

  window.addEventListener(
    'click',
    () => onClick(scene, camera, principleMesh, () => {
      // Usage: zoom in to twice the distance from the current target
      smoothZoom(maxDistance, 1000);
    }),
    false,
  );

  function checkIntersections() {
    if (camera && camera.isPerspectiveCamera) {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects([beltMesh, imageBeltMesh, principleMesh], true);

      if (intersects.length > 0) {
        // console.log('moving cursor around', intersects);
        document.body.style.cursor = 'pointer'; // Change cursor style when over a mesh
        return;
      }

      document.body.style.cursor = 'auto';
    }
  }

  let lastTime = 0;
  const interval = 100; // Check every 100 ms

  function animate() {
    requestAnimationFrame(animate);
    controls.update();

    const time = performance.now();
    const delta = time - lastTime;

    if (delta > interval) {
      checkIntersections();
      lastTime = time; // update the last time intersection was checked
    }

    renderer.render(scene, camera);
  }

  // Call the animate function
  animate();

  // Adjust camera and renderer on window resize
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.fonts.load('48px Lastik').then(() => {
    setupScene();
  }).catch((e) => console.error(e));
});
