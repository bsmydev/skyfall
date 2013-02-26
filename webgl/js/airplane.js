SKY.Airplane = function( callback )
{
	var geometry = SKY.Geometries.plane,
		material = new THREE.MeshPhongMaterial( { color : 0xffffff } );

	THREE.Mesh.call( this, geometry, material );
	SKY.FlyableObject.call( this );

	this.camera.position = new THREE.Vector3( 0, 25, 150 );
	this.speed = 10;
};


SKY.Airplane.prototype = new THREE.Mesh();