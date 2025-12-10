const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const outfit = urlParams.get('outfit');

let scene, camera, renderer, model, controls, pivot;

function loadTexture(url) {
    return new THREE.TextureLoader().load(url);
}

function changeTexture(url) {
    if (!model) return;

    const newTexture = loadTexture(url);

    model.traverse((child) => {
        if (child.isMesh) {
            child.material.color.set(0xf0ffff); 
            child.material.map = newTexture;
            child.material.needsUpdate = true;
        }
    });
}

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false; 
    controls.enablePan = false; 
    controls.enableRotate = true;
    controls.maxPolarAngle = Math.PI / 2; 
    controls.minPolarAngle = Math.PI / 2;
    controls.screenSpacePanning = false; 

    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
            
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);
    
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight1.position.set(-5, -10, -5);
    scene.add(directionalLight1);

    pivot = new THREE.Object3D();
    scene.add(pivot);

    const loader = new THREE.GLTFLoader();
    loader.load('/assets/3d/viewport.glb', function (gltf) {
        model = gltf.scene;

        model.position.set(0, -2.5, 0); 
        model.scale.set(1.05, 1.05, 1.05);

        pivot.add(model);

        changeTexture(`/assets/img/clothing/${outfit}.png`);

    }, undefined, function (error) {
        console.error('Error loading model:', error);
    });

    camera.position.set(0, 0, 4.5);
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

window.onload = init;