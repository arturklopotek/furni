var camera, orthoCamera, scene, renderer;
var viewport;

let prevParams = {};
const Params = {

};

init();
animate();

function init() {
	const previewEl = document.getElementById("preview");
	viewport = {
		width: previewEl.offsetWidth,
		height: previewEl.offsetHeight,
	};

	camera = new THREE.PerspectiveCamera( 70, viewport.width / viewport.height, 1, 20000 );
	camera.position.y = 300;
	camera.position.z = 400;

	orthoCamera = new THREE.OrthographicCamera( viewport.width / - 2, viewport.width / 2, viewport.height / 2, viewport.height / - 2, 1, 20000 );
	orthoCamera.position.y = 200;
	orthoCamera.position.z = 400;

	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xffffff);
	
	//scene.add(createObject(new THREE.BoxBufferGeometry( 200, 200, 200 )));

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( viewport.width, viewport.height );
	
	var controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.target.set(0,0,0);
	camera.lookAt(controls.target);

	var controls = new THREE.OrbitControls( orthoCamera, renderer.domElement );
	controls.target.set(0,0,0);
	orthoCamera.lookAt(controls.target);

	previewEl.appendChild( renderer.domElement );
	//
	window.addEventListener( 'resize', onWindowResize, false );
}

function createObject(geometry) {
	const whiteMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );
	const mesh = new THREE.Mesh(geometry, whiteMaterial);

	const edges = new THREE.EdgesGeometry(geometry);
	lines = new THREE.LineSegments( edges, new THREE.LineBasicMaterial({
		color: 0x000000,
		linewidth: 2
	}));

	const group = new THREE.Group();
	group.add(mesh);
	group.add(lines);

	return group;
}

function onWindowResize() {
	camera.aspect = viewport.width / viewport.height;
	camera.updateProjectionMatrix();
	renderer.setSize( viewport.width, viewport.height );
}

function reset(params) {
	while (scene.children.length) {
		scene.remove(scene.children[0]);
	}

	const object = new THREE.Group();

	const { w: a, d: b, h: c } = params,
		d = 20;

	// top
	{
		const elementGeometry = createElementA(a,b,c,d);
		object.add(createObject(elementGeometry));
	}
	// R-side
	{
		const elementGeometry = createElementB(a,b,c,d);
		const obj = createObject(elementGeometry);
		obj.rotation.y = Math.PI / 2;
		obj.position.x = 0.5 * a - 2 * d;
		object.add(obj);
	}
	// L-side
	{
		const elementGeometry = createElementB(a,b,c,d);
		const obj = createObject(elementGeometry);
		obj.rotation.y = Math.PI / 2;
		obj.position.x = - (0.5 * a - 2 * d);
		object.add(obj);
	}
	// support
	{
		const elementGeometry = createElementC(a,b,c,d);
		const obj = createObject(elementGeometry);
		obj.rotation.x = Math.PI / 2;
		object.add(obj);
	}

	object.rotation.x = -Math.PI / 2;
	object.rotation.z = 0.5 * Math.PI/2;
	object.position.y = c/2;
	scene.add(object);
}

function animate() {
	if (JSON.stringify(prevParams) != JSON.stringify(Params)) {
		reset(Params);
		prevParams = Object.assign({}, Params);
	}
	requestAnimationFrame(animate);
	renderer.render( scene, Params.ortho ? orthoCamera : camera );
}
