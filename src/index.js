import * as THREE from 'three';
import GUI from 'lil-gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import createAndAddText from './components/text';
import createAndAddLogo from './components/logo-texture';
import { onClick, onMouseMove } from './components/clickHandler';
import './style/index.css';
import './style/font.css';

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

  const controls = new OrbitControls(camera, renderer.domElement);

  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  controls.enabled = true;
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableRotate = true;
  controls.minPolarAngle = Math.PI / 2;
  controls.maxPolarAngle = Math.PI / 2;
  controls.rotateSpeed = 1;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.5;

  // Create a sphere geometry for the globe
  const globeGeometry = new THREE.SphereGeometry(10, 32, 32);

  // Create a wireframe material
  const globeMaterial = new THREE.MeshBasicMaterial({
    color: 0xcccccc,
    wireframe: true,
    transparent: true,
    opacity: 0.4,
    depthTest: false,
  });

  // Create a mesh with the geometry and material
  const globeMesh = new THREE.Mesh(globeGeometry, globeMaterial);
  scene.add(globeMesh);

  const vFOV = THREE.MathUtils.degToRad(camera.fov); // Convert to radians
  const hFOV = 2 * Math.atan(Math.tan(vFOV / 2) * camera.aspect);

  let limitFov = vFOV;

  if (camera.aspect < 1) {
    limitFov = hFOV;
  }

  const distance = 10 / Math.sin(limitFov / 2);

  // Position the camera
  camera.position.x = 0;
  camera.position.z = distance * 1.2;
  camera.updateProjectionMatrix();

  const { beltMesh, textEdges, textInvisiblePlane } = createAndAddText();
  const imageMesh = await createAndAddLogo();

  globeMesh.position.set(0, 0, 0);

  imageMesh.rotation.y = Math.PI / 2;

  const globeAndBelts = new THREE.Group();
  globeAndBelts.add(globeMesh);
  globeAndBelts.add(beltMesh);
  globeAndBelts.add(textEdges);
  globeAndBelts.add(imageMesh);

  // Add the belt to the scene
  scene.add(globeAndBelts);
  scene.add(textInvisiblePlane);

  console.log(camera, globeAndBelts, scene);

  const gui = new GUI();
  gui.add(document, 'title');

  window.addEventListener('mousemove', onMouseMove, false);

  window.addEventListener('click', () => onClick(scene, camera, textInvisiblePlane), false);

  function animate() {
    requestAnimationFrame(animate);

    controls.update();

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
