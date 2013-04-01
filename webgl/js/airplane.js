SKY.Airplane = function( parameters )
{
	var geometry = SKY.Geometries.ship,
		material = new THREE.MeshPhongMaterial( { color : 0xffffff } ),
		parameters = parameters || {};

	THREE.Mesh.call( this, geometry, material );
	SKY.FlyableObject.call( this );

	this.camera.position = new THREE.Vector3( 0, 25, 150 );
	
	this.speed = 10;

	/* Speed related values */
	this._minSpeed = 10.0;
	this._maxSpeed = 30.0;

	this._acceleration = 4.0;
	this._deceleration = 4.0;

	this._accelerating = false;
	this._decelerating = false;

	/*
	*	Lights
	*/
	var self = this;

	( function(){

		var geometry = new THREE.SphereGeometry( 4, 10, 10 ),
			material = new THREE.MeshBasicMaterial( { color : 0xBFECFF } ),

			mesh = new THREE.Mesh( geometry, material );

		mesh.position.z = 35;
		self.add( mesh );

		mesh = new THREE.Mesh( geometry, material );
		mesh.position.x = -31;
		mesh.position.y = -11;
		mesh.position.z = 25;
		mesh.scale = new THREE.Vector3( 0.5, 0.5, 0.5 );
		self.add( mesh );

		mesh = new THREE.Mesh( geometry, material );
		mesh.position.x = 31;
		mesh.position.y = -11;
		mesh.position.z = 25;
		mesh.scale = new THREE.Vector3( 0.5, 0.5, 0.5 );
		self.add( mesh );

	} )();

	/*
	 *	Collision box
	 */
	geometry = new THREE.CubeGeometry( 75, 25, 50 );
	material = new THREE.MeshBasicMaterial( { color : 0xff0000, wireframe : true, opacity : 0.0 } );
	this.collisionBox = new THREE.Mesh( geometry, material );

	this.collisionBox.position = new THREE.Vector3( 0, 15, 0 );

	SKY.Collidable.call( this, { detector : this.collisionBox } );
	this.add( this.collisionBox );

	this.collidables = parameters.collidables !== undefined ? parameters.collidables : [];

	this.lastShot = 0;
	this.shootDelay = 100;

	/*
	 *	Shield
	 */

	( function() {

		var geometry = new THREE.SphereGeometry( 50, 20, 20 ),
			material = new THREE.MeshBasicMaterial( { color : 0xBFECFF, transparent : true, opacity : 0.0 } ),
			shield = new THREE.Mesh( geometry, material );

		self.shield = shield;
		self.add( shield );

	} )();
};


SKY.Airplane.prototype = new THREE.Mesh();


SKY.Airplane.prototype.animate = function()
{
	var self = this,
		speed = this.speed;

	/* Rotate airplane */
	this.updateControls();


	/* Fire objects */
	if ( SKY.Controls.SPACE )
	{
		if ( SKY.Clock.current() - this.lastShot > this.shootDelay )
		{
			this.fire();
		}
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
	this.detectCollision( this.collidables, function ( intersection )
	{
		console.log( intersection );
		self.shield.material.opacity = 0.5;
		self.shield.material.needsUpdate = true;
	} );
	this.updateShield();

};

SKY.Airplane.prototype.fire = function()
{
	this.lastShot = SKY.Clock.current();
	SKY.App.environment.fireables.add( new SKY.Missile( {

		color : 0xBFECFF,
		speed : this.speed,
		direction : this.direction.clone().negate()

	} ) );
};


SKY.Airplane.prototype.updateShield = function()
{
	if ( this.shield.material.opacity > 0 )
	{
		this.shield.material.opacity -= 0.01;
		this.shield.material.needsUpdate = true;
	}
};