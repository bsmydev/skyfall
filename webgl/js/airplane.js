SKY.Airplane = function( callback )
{
	var loader = new THREE.JSONLoader(),
		geometry = null,
		material = null,
		self = this;

	loader.load( 'models/plane.js', function ( loadedGeometry )
	{

		geometry = loadedGeometry;
		material = new THREE.MeshPhongMaterial( { color : 0xffffff } );

		THREE.Mesh.call( self, geometry, material );
		SKY.FlyableObject.call( self );

		self.camera.position = new THREE.Vector3( 0, 25, 150 );
		self.speed = 10;

		if ( callback )
		{
			callback();
		}

	} );

};


SKY.Airplane.prototype = new THREE.Mesh();