SKY.Airplane = function( callback )
{
	var geometry = SKY.Geometries.plane,
		material = new THREE.MeshPhongMaterial( { color : 0xffffff } );

	THREE.Mesh.call( this, geometry, material );
	SKY.FlyableObject.call( this );

	this.camera.position = new THREE.Vector3( 0, 25, 150 );
	this.speed = 10;

	/*
	 *	Collision box
	 */
	geometry = new THREE.CubeGeometry( 75, 25, 50 );
	material = new THREE.MeshBasicMaterial( { color : 0xff0000, wireframe : true, opacity : 0.0 } );
	this.collisionBox = new THREE.Mesh( geometry, material );

	this.collisionBox.position = new THREE.Vector3( 0, 15, 0 );
	SKY.Collidable.call( this.collisionBox );
	this.add( this.collisionBox );
};


SKY.Airplane.prototype = new THREE.Mesh();


SKY.Airplane.prototype.animate = function()
{
	this.updateControls();

	if ( SKY.Controls.SPACE )
	{
		this.speed = 30;
		SKY.GLManager.enableMotionBlur();
	}
	else
	{
		this.speed = 10;
		SKY.GLManager.disableMotionBlur();
	}
};