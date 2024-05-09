import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import fontJson from '../resources/fonts/helvetiker_regular.typeface.json';

export default async function createAndAddPrinciples(scene) {
  const loader = new FontLoader();

  loader.load(fontJson, (font) => {
    const textGeometry = new TextGeometry('Principles', {
      font,
      size: 1,
      height: 0,
      curveSegments: 16,
    });

    textGeometry.center();

    // Create a material with the canvas texture
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 1 });

    // Create a mesh with the geometry and material
    const principleMesh = new THREE.Mesh(textGeometry, textMaterial);
    principleMesh.position.set(0, 0, 0);

    // scene.add(principleMesh);
  });

  // principleMesh.rotation.y = Math.PI;
}
