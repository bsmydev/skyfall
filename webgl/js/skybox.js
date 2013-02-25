SKY.Skybox = function()
{
	var texture = new THREE.ImageUtils.loadTextureCube( [ 'img/nx.png', 'img/px.png','img/py.png','img/ny.png','img/pz.png','img/nz.png' ] ),
		shader = THREE.ShaderLib[ "cube" ];

	shader.uniforms[ "tCube" ].value = texture;

	THREE.Mesh.call( this,
		new THREE.CubeGeometry( 10000, 10000, 10000 ),
		new THREE.ShaderMaterial( {

		    uniforms        : shader.uniforms,
		    fragmentShader  : shader.fragmentShader,
		    vertexShader    : shader.vertexShader,
		    depthWrite      : false,
		    side: THREE.BackSide

		} )
	);
};

SKY.Skybox.prototype = new THREE.Mesh();

SKY.Skybox.prototype.constructor = SKY.Skybox;