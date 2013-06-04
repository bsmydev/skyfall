SKY.Spaceship = function( parameters )
{
	var geometry = SKY.Geometries.ship,
		material = new THREE.MeshPhongMaterial( { color : 0xffffff } ),
		parameters = parameters || {};

	THREE.Mesh.call( this, geometry, material );
	SKY.FlyableObject.call( this );

	this.camera.position = new THREE.Vector3( 0, 25, -150 );
	this.camera.lookAt( new THREE.Vector3( 0, 0, -1 ) );
	this.speed = 10;

	/* Speed related values */
	this._minSpeed = 10.0;
	this._maxSpeed = 30.0;

	this._acceleration = 4.0;
	this._deceleration = 4.0;

	this._accelerating = false;
	this._decelerating = false;

	/*
	*	Trails
	*/
	var self = this;

	( function(){

		var trail = new SKY.Trail( {

			color : 0xBFECFF

		} );

		trail.position.z = -55;
		self.add( trail );

		self.trail = trail;

	} )();

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

};


SKY.Spaceship.prototype = new THREE.Mesh();


SKY.Spaceship.prototype.animate = function()
{
	var self = this,
		speed = this.speed;

	if ( SKY.CLIENT )
	{
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
	*	Update ship position
	*/
	var movement = this.direction.clone().multiplyScalar( this.speed * SKY.Clock.speed() );
	this.position.add( movement );
	this.lookAt( this.position.clone().add( this.direction.clone() ) );
	/*
	 *	Update camera position according to speed
	 */

	this.camera.position.z = this.speed * -150 / this._minSpeed;


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
	this.trail.update( movement );

};

SKY.Spaceship.prototype.fire = function()
{
	this.lastShot = SKY.Clock.current();
	SKY.App.environment.fireables.add( new SKY.Missile( {

		color : 0xBFECFF,
		speed : this.speed,
		direction : this.direction.clone(),
		position : this.position.clone()

	} ) );
};


SKY.Spaceship.prototype.updateShield = function()
{
	if ( this.shield.material.opacity > 0 )
	{
		this.shield.material.opacity -= 0.01;
		this.shield.material.needsUpdate = true;
	}
};