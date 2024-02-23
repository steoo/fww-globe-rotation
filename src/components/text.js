import * as THREE from "three";

export default function createAndAddText() {
  var canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 256;
  var context = canvas.getContext("2d");
  context.font = "72px Arial";
  context.fillStyle = "black";
  context.textAlign = "center";
  context.fillText("Franchise Worldwide", canvas.width / 2, canvas.height / 2);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;

  // Create a cylinder geometry that will act as the belt
  const beltGeometry = new THREE.CylinderGeometry(10.1, 10.1, 4, 64); // Slightly larger radius than the globe

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

