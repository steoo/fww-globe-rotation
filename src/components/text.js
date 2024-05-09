import * as THREE from 'three';

export default function createAndAddText() {
  const scale = window.devicePixelRatio; // Get the device's pixel ratio

  const canvas = document.createElement('canvas');
  canvas.width = 360 * scale;
  canvas.height = 64 * scale;

  const canvasOffsetPositioning = 10;

  const context = canvas.getContext('2d');
  context.font = '36px Lastik';
  context.fillStyle = 'black';
  context.textAlign = 'center';
  context.letterSpacing = '-2px';
  context.scale(scale, scale);
  context.fillText('Franchise Worldwide', canvas.width / scale / 2, (canvas.height / scale) / 2 + canvasOffsetPositioning);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;

  const radius = 10.2;
  const height = 2;
  const radialSegments = 16;
  const heightSegments = 1;
  const thetaStart = -0.5;
  const thetaLength = Math.PI / 3;

  // Create a cylinder geometry that will act as the belt
  // Slightly larger radius than the globe
  const beltGeometry = new THREE.CylinderGeometry(radius, radius, height, radialSegments, heightSegments, true, thetaStart, thetaLength);
  const invisiblePlaneGeometry = new THREE.CylinderGeometry(radius, radius, height, radialSegments, heightSegments, true, thetaStart, thetaLength);

  const invisiblePlaneMaterial = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0.2,
    color: 0x000000,
    side: THREE.FrontSide,
    depthTest: true,
  });

  const textInvisiblePlane = new THREE.Mesh(invisiblePlaneGeometry, invisiblePlaneMaterial);
  textInvisiblePlane.position.set(0, 0, 0);

  // Create a material with the canvas texture
  const beltMaterial = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.FrontSide,
    transparent: true,
    depthTest: true,
  });

  // Create a mesh with the geometry and material
  const beltMesh = new THREE.Mesh(beltGeometry, beltMaterial);
  beltMesh.geometry.computeBoundingBox();
  const boxHelper = new THREE.BoxHelper(beltMesh, 0xff0000);

  return {
    beltMesh,
    textInvisiblePlane,
    boxHelper,
  };
}
