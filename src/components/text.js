import * as THREE from 'three';

export default function createAndAddText() {
  const scale = window.devicePixelRatio; // Get the device's pixel ratio

  const canvas = document.createElement('canvas');
  canvas.width = 320 * 2 * scale;
  canvas.height = 64 * 2 * scale;

  const canvasOffsetPositioning = 20;

  const context = canvas.getContext('2d');
  context.font = '64px Lastik';
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

  const radius = 5;
  const height = 1;
  const radialSegments = 16;
  const heightSegments = 1;
  const thetaLength = Math.PI / 3; // Your segment covers π/3 radians
  const thetaStart = Math.PI / 2 - thetaLength / 2; // Start from half of thetaLength back from π/2

  // const thetaStart = 0;

  // Create a cylinder geometry that will act as the belt
  // Slightly larger radius than the globe
  const beltGeometry = new THREE.CylinderGeometry(radius, radius, height, radialSegments, heightSegments, true, thetaStart, thetaLength);
  // const invisiblePlaneGeometry = new THREE.CylinderGeometry(radius, radius, height, radialSegments, heightSegments, true, thetaStart, thetaLength);

  // const invisiblePlaneMaterial = new THREE.MeshBasicMaterial({
  //   transparent: true,
  //   opacity: 0.2,
  //   color: 0x000000,
  //   side: THREE.FrontSide,
  //   depthTest: true,
  // });

  // const textInvisiblePlane = new THREE.Mesh(invisiblePlaneGeometry, invisiblePlaneMaterial);
  // textInvisiblePlane.position.set(0, 0, 5);

  // Create a material with the canvas texture
  const beltMaterial = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.FrontSide,
    transparent: true,
    depthTest: true,
  });

  // Create a mesh with the geometry and material
  const beltMesh = new THREE.Mesh(beltGeometry, beltMaterial);
  beltMesh.name = 'FranchiseWorldWideText';
  beltMesh.geometry.computeBoundingBox();
  beltMesh.position.set(0, 0, 10);
  beltMesh.rotation.y = -Math.PI / 2;

  const { boundingBox } = beltMesh.geometry;
  const offset = boundingBox.getCenter(new THREE.Vector3()).negate();
  beltMesh.geometry.translate(offset.x, offset.y, offset.z);

  const axesHelper = new THREE.AxesHelper(10); // Size of the axes in units

  const edgesGeometry = new THREE.EdgesGeometry(beltGeometry);
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 }); // Red for visibility
  const edgeLines = new THREE.LineSegments(edgesGeometry, lineMaterial);

  const boxHelper = new THREE.BoxHelper(beltMesh, 0xff0000);
  beltMesh.add(axesHelper); // Add it to the globeMesh so it moves with the globe
  beltMesh.add(edgeLines); // Add it to the globeMesh so it moves with the globe

  return {
    beltMesh,
    // textInvisiblePlane,
    boxHelper,
  };
}
