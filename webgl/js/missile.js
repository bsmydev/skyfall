SKY.Missile = function( parameters )
{
	var geometry = new THREE.CubeGeometry( 10, 10, 50 ),
		material = new THREE.MeshBasicMaterial(),
		parameters = parameters || {};

	THREE.Mesh.call( this, geometry, material );

	parameters.speed = 30;

	SKY.FireableObject.call( this, parameters );

	/*
	*	Collision line
	*/
	geometry = new THREE.Geometry();
	geometry.vertices.push( new THREE.Vector3( 0, 0, -60 ) );
	geometry.vertices.push( new THREE.Vector3( 0, 0, 60 ) );

	material = new THREE.LineBasicMaterial( { color : 0xff0000 } );     

	this.collisionLine = new THREE.Line( geometry, material );
	SKY.Collidable.call( this.collisionLine );
	this.add( this.collisionLine );

};

SKY.Missile.prototype = new THREE.Mesh();