import * as THREE from "three";

export default function createAndAddText() {
  const scale = window.devicePixelRatio; // Get the device's pixel ratio
  
  var canvas = document.createElement("canvas");
  canvas.width = 2048 * scale;
  canvas.height = 256 * scale;

  var context = canvas.getContext("2d");
  context.scale(scale, scale)
  
  context.font = "48px Manrope";
  context.fillStyle = "black";
  context.textAlign = "center";
  context.fillText("Franchise Worldwide", (canvas.width / scale) /2 , (canvas.height / scale) / 2);
  // document.body.appendChild(canvas)

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;

  // Create a cylinder geometry that will act as the belt
  const beltGeometry = new THREE.CylinderGeometry(10.2, 10.2, 8, 64); // Slightly larger radius than the globe

  // Create a material with the canvas texture
  const beltMaterial = new THREE.MeshBasicMaterial({
    map: texture,
    // color: new THREE.Color(255, 255, 255),
    side: THREE.FrontSide,
    transparent: true,
    depthTest: false,
  });

  // Create a mesh with the geometry and material
  const beltMesh = new THREE.Mesh(beltGeometry, beltMaterial);

  return beltMesh;
}

