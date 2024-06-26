import * as THREE from 'three';

export default function createAndAddLogo() {
  return new Promise((resolve, reject) => {
    // Create a texture loader
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = 'anonymous'; // Requests CORS access

    // Load the texture
    loader.load(
      'https://assets-global.website-files.com/62711381f8a3971f7e9b240d/65d8e4c9b42eaf00f1703c49_logo.png',
      (texture) => {
        // The onLoad callback
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;

        // Create a material with the loaded texture
        const imageMaterial = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.FrontSide,
          transparent: true,
        });

        // Create a PlaneGeometry for simplicity
        const imageBeltGeometry = new THREE.PlaneGeometry(5, 5);

        // Create a mesh with the geometry and material
        const imageBeltMesh = new THREE.Mesh(imageBeltGeometry, imageMaterial);
        imageBeltMesh.name = 'LOGO FW';
        imageBeltMesh.rotation.y = Math.PI; // Adjust orientation as needed

        const scale = 0.5;
        imageBeltMesh.scale.set(scale, scale, scale); // Set the scale
        imageBeltMesh.position.set(0, 0, -10); // Adjust the position as needed

        // Resolve the promise with the group
        resolve(imageBeltMesh);
      },
      undefined, // onProgress callback (optional)
      (error) => {
        // The onError callback
        console.error('Error loading texture:', error);
        reject(error);
      },
    );
  });
}
