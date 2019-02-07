var camera, orthoCamera, scene, renderer;
var mesh, lines, group, viewport;

const Params = {

}

init();
animate();

function init() {
	const previewEl = document.getElementById("preview");
	viewport = {
		width: previewEl.offsetWidth,
		height: previewEl.offsetHeight,
	}

	camera = new THREE.PerspectiveCamera( 70, viewport.width / viewport.height, 1, 20000 );
	camera.position.z = 900;

	orthoCamera = new THREE.OrthographicCamera( viewport.width / - 2, viewport.width / 2, viewport.height / 2, viewport.height / - 2, 1, 20000 );
	orthoCamera.position.z = 900;

	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xffffff);
	
	var geometry = new THREE.BoxBufferGeometry( 200, 200, 200 );
	var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
	mesh = new THREE.Mesh( geometry, material );

	var edges = new THREE.EdgesGeometry( geometry );
	lines = new THREE.LineSegments( edges, new THREE.LineBasicMaterial({ 
		color: 0x000000,
		linewidth: 2
	}));

	group = new THREE.Group();
	group.add(mesh);
	group.add(lines);

	scene.add(group);	

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( viewport.width, viewport.height );
	
	var controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.maxPolarAngle = 1.13*Math.PI/2; // radians
	controls.target.set(0,0,0);
	camera.lookAt(controls.target);

	var controls = new THREE.OrbitControls( orthoCamera, renderer.domElement );
	controls.maxPolarAngle = 1.13*Math.PI/2; // radians
	controls.target.set(0,0,0);
	orthoCamera.lookAt(controls.target);

	previewEl.appendChild( renderer.domElement );
	//
	window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
	camera.aspect = viewport.width / viewport.height;
	camera.updateProjectionMatrix();
	renderer.setSize( viewport.width, viewport.height );
}
function animate() {
	requestAnimationFrame( animate );
	group.rotation.x = 0.5;
	group.rotation.y = -0.8;

	group.scale.x = Params.w / 200;
	group.scale.z = Params.d / 200;
	group.scale.y = Params.h / 200;

	renderer.render( scene, Params.ortho ? orthoCamera : camera );
}