SKY.Airplane = function( parameters )
{
	var geometry = SKY.Geometries.plane,
		material = new THREE.MeshPhongMaterial( { color : 0xffffff } ),
		parameters = parameters || {};

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

	this.collidables = parameters.collidables !== undefined ? parameters.collidables : [];
};


SKY.Airplane.prototype = new THREE.Mesh();


SKY.Airplane.prototype.animate = function()
{
	/* Rotate airplane */
	this.updateControls();

	/* Detect collisions */
	this.collisionBox.detectCollision( this.collidables, function ( intersection )
	{
		console.log( intersection );
	} );

	// if ( SKY.Controls.SPACE )
	// {
	// 	this.speed = 20;
	// 	SKY.GLManager.enableMotionBlur();
	// }
	// else
	// {
	// 	this.speed = 10;
	// 	SKY.GLManager.disableMotionBlur();
	// }

	if ( SKY.Controls.ALT )
	{
		SKY.Clock.setSpeed( 0.25 );
		SKY.blur = true;
	}
	else
	{
		SKY.Clock.setSpeed( 1 );
		SKY.blur = false;
	}	

};