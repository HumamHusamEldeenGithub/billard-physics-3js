import * as THREE from 'three';


export function createBall(position, color) {
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: color, wireframe: true });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.x = position.x;
    sphere.position.y = position.y;
    sphere.position.z = position.z;
    sphere.position.y = 1;
    console.log(sphere);
    return sphere;
};