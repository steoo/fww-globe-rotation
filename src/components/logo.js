import * as THREE from "three";
import logoImage from '../assets/logo.png';

export default async function createAndAddLogo() {
  return new Promise((resolve, reject) => {
    // Load the image
    var image = new Image();
    image.src = logoImage;

    image.onload = function () {
      // Create a canvas for the image
      var canvas = document.createElement("canvas");
      var context = canvas.getContext("2d");
      canvas.width = 256; // Adjust as needed
      canvas.height = 256; // Adjust as needed

      // Draw the image onto the canvas
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      // Use the canvas as a texture
      var texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      // texture.rotation = 0;

      // Create a material with the canvas texture
      var imageMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.FrontSide,
        transparent: true,
      });

      // Create a cylinder geometry for the image, similar to the text belt
      // var imageBeltGeometry = new THREE.CylinderGeometry(10.1, 10.1, 0.1, 64); // Adjust dimensions as needed
      var imageBeltGeometry = new THREE.PlaneGeometry(5, 5); // Use PlaneGeometry for simplicity

      
      // Create a mesh with the geometry and material
      var imageBeltMesh = new THREE.Mesh(imageBeltGeometry, imageMaterial);
      
      // Position the image mesh
      imageBeltMesh.rotation.y = Math.PI / 2; // Make the belt horizontal
      const scale = 0.8;
      
      imageBeltMesh.scale.set(scale, scale, scale); // Set scale to 1 for debugging
      imageBeltMesh.position.set(10, 0, 0); // Adjust x to move it away from the globe center
      
      var group = new THREE.Group();
      group.add(imageBeltMesh);
      // Add the image mesh to the scene
      resolve(group);
    };

    image.onerror = (...args) => {
      console.error("errors", args);
      reject(args);
    };
  });
}
