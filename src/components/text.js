import * as THREE from 'three';

export default function createAndAddText() {
  const scale = window.devicePixelRatio; // Get the device's pixel ratio

  const canvas = document.createElement('canvas');
  canvas.width = 2048 * scale;
  canvas.height = 256 * scale;

  const context = canvas.getContext('2d');
  context.font = '36px Lastik';
  context.fillStyle = 'black';
  context.textAlign = 'center';
  context.scale(scale, scale);
  context.fillText('Franchise Worldwide', (canvas.width / scale) / 2, (canvas.height / scale) / 2);
  // document.body.appendChild(canvas)

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;

  // Create a cylinder geometry that will act as the belt
  // Slightly larger radius than the globe
  const beltGeometry = new THREE.CylinderGeometry(10.2, 10.2, 8, 64);

  // Create a material with the canvas texture
  const beltMaterial = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.FrontSide,
    transparent: true,
    depthTest: false,
  });

  // Create a mesh with the geometry and material
  const beltMesh = new THREE.Mesh(beltGeometry, beltMaterial);

  return beltMesh;
}
