import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import createAndAddText from "./components/text";
import createAndAddLogo from "./components/logo";
import "./style/index.css";
import "./style/font.css";

async function setupScene() {
  // Initialize the scene, camera, and renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xffffff);
  document.getElementById("globeContainer").appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.maxDistance = 25;
  controls.minPolarAngle = Math.PI / 2;
  controls.maxPolarAngle = Math.PI / 2;
  controls.rotateSpeed = 1.5;


  // Create a sphere geometry for the globe
  const globeGeometry = new THREE.SphereGeometry(10, 32, 32);

  // Create a wireframe material
  const globeMaterial = new THREE.MeshBasicMaterial({
    color: 0xcccccc,
    wireframe: true,
    transparent: true,
    opacity: 0.1,
    depthTest: false,
  });

  // Create a mesh with the geometry and material
  const globeMesh = new THREE.Mesh(globeGeometry, globeMaterial);
  scene.add(globeMesh);

  // Position the camera
  camera.position.z = 35;

  const beltMesh = createAndAddText();
  const imageMesh = await createAndAddLogo();
  
  beltMesh.position.set(0, 0, 0)
  imageMesh.position.set(0, 0, 0)

  imageMesh.rotation.y = Math.PI / 2;
  beltMesh.rotation.y = Math.PI;

  // Add the belt to the scene
  scene.add(beltMesh);
  scene.add(imageMesh);


  function animate() {
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
  }

  // Call the animate function
  animate();

  // Adjust camera and renderer on window resize
  window.addEventListener("resize", () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });
}

setupScene();
