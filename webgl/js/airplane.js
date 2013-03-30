SKY.Airplane = function( parameters )
{
	var geometry = SKY.Geometries.plane,
		material = new THREE.MeshPhongMaterial( { color : 0xffffff } ),
		parameters = parameters || {};

	THREE.Mesh.call( this, geometry, material );
	SKY.FlyableObject.call( this );

	this.camera.position = new THREE.Vector3( 0, 25, 150 );
	

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

	this.speed = 10;

	/* Speed related values */
	this._minSpeed = 10.0;
	this._maxSpeed = 30.0;

	this._acceleration = 4.0;
	this._deceleration = 4.0;

	this._accelerating = false;
	this._decelerating = false;

};


SKY.Airplane.prototype = new THREE.Mesh();


SKY.Airplane.prototype.animate = function()
{
	var speed = this.speed;

	/* Rotate airplane */
	this.updateControls();


	/* Fire objects */
	if ( SKY.Controls.SPACE )
	{
		this.fire();
	}

	if ( SKY.Controls.MAJ )
	{
		this._accelerating = true;
		SKY.blur = true;
	}
	else
	{
		this._accelerating = false;
		this._decelerating = true;
		SKY.blur = false;
	}	

	/*if ( SKY.Controls.ALT )
	{
		SKY.Clock.setSpeed( 0.25 );
		SKY.blur = true;
	}
	else
	{
		SKY.Clock.setSpeed( 1 );
		SKY.blur = false;
	}*/


	
	/*
	 *	Calculate airplane speed
	 */


	if ( this._accelerating )
	{
		speed += speed * this._acceleration * 0.01;
		if ( speed < this._maxSpeed )
		{
			this.speed = speed;
		}
		else
		{
			this._accelerating = false;
		}
	}
	else if ( this._decelerating )
	{
		speed -= speed * this._deceleration * 0.01;
		if ( speed > this._minSpeed )
		{
			this.speed = speed;
		}
		else
		{
			this._decelerating = false;
		}
	}

	/*
	 *	Update camera position according to speed
	 */

	this.camera.position.z = this.speed * 150 / this._minSpeed;


	/* 
	 *	Update renderer according to speed
	 */
	 if ( this._accelerating || this._decelerating )
	 {
	 	SKY.blur = true;
	 }


	/* Detect collisions */
	this.collisionBox.detectCollision( this.collidables, function ( intersection )
	{
		console.log( intersection );
	} );

};

SKY.Airplane.prototype.fire = function()
{
	SKY.App.environment.fireables.add( new SKY.Missile( {

		speed : this.speed,
		direction : this.direction.clone().negate()

	} ) );
};