import * as THREE from 'three';
import logoImage from '../assets/logo.png';

export default async function createAndAddLogo() {
  return new Promise((resolve, reject) => {
    // Load the image
    const image = new Image();
    image.src = logoImage;

    image.onload = function () {
      // Create a canvas for the image
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 256; // Adjust as needed
      canvas.height = 256; // Adjust as needed

      // Draw the image onto the canvas
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      // Use the canvas as a texture
      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      // texture.rotation = 0;

      // Create a material with the canvas texture
      const imageMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.FrontSide,
        transparent: true,
      });

      // Create a cylinder geometry for the image, similar to the text belt
      const imageBeltGeometry = new THREE.PlaneGeometry(5, 5); // Use PlaneGeometry for simplicity

      // Create a mesh with the geometry and material
      const imageBeltMesh = new THREE.Mesh(imageBeltGeometry, imageMaterial);

      // Position the image mesh
      imageBeltMesh.rotation.y = Math.PI / 2; // Make the belt horizontal
      const scale = 0.8;

      imageBeltMesh.scale.set(scale, scale, scale); // Set scale to 1 for debugging
      imageBeltMesh.position.set(10, 0, 0); // Adjust x to move it away from the globe center

      const group = new THREE.Group();
      group.add(imageBeltMesh);
      // Add the image mesh to the scene
      resolve(group);
    };

    image.onerror = (...args) => {
      console.error('errors', args);
      reject(args);
    };
  });
}
