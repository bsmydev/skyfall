SKY.Environment = function()
{
	THREE.Object3D.call( this );
	
	var geometry = new THREE.CubeGeometry( 25, 25, 25 ),
		cubeMaterial = new THREE.MeshBasicMaterial( { wireframe : true } ),
		cloudMaterial = new THREE.MeshBasicMaterial( { color : 0x000000 } ),
		object = null,
		i = 0,
		self = this;
	

	this.asteroids = new THREE.Object3D();
	this.add( this.asteroids );
	for ( ; i < 1000; i++ )
	{
		object = new SKY.Meteorite();
		object.position = new THREE.Vector3( 10000 * Math.random() - 5000, 10000 * Math.random(), 10000 * Math.random() - 5000 );
		object.weight = Math.floor( 1 + 10 * Math.random() );
		this.asteroids.add( object );
	}

	this.fireables = new THREE.Object3D();
	this.add( this.fireables );

};


SKY.Environment.prototype = new THREE.Object3D();


SKY.Environment.prototype.update = function( direction )
{
	this.updateAsteroids( direction );
	this.updateFireables( direction );
};


SKY.Environment.prototype.updateAsteroids = function( direction )
{
	var i = 0,
		object = null,
		position = null,
		side = new THREE.Vector3().crossVectors( SKY.App.airplane.direction, SKY.App.airplane.up );
	/*
	 *	Objects shall fall with different speed 
	 *	otherwise it looks like the plane is going up
	 */ 

	for ( ; i < this.asteroids.children.length; i++ )
	{
		object = this.asteroids.children[ i ];

		if ( object.position.length() < 5000 )
		{
			object.position.add( direction.clone() );
		}
		else
		{
			/* Make asteroids appear in front of the ship */
			position = direction.clone().normalize().negate().setLength( 3000 * Math.random() + 2000 );
			position.add( side.clone().setLength( Math.random() * 5000 - 2500 ) );
			position.add( SKY.App.airplane.up.clone().setLength( Math.random() * 5000 - 2500 ) );
			object.position = position;
		}
	}

};


SKY.Environment.prototype.updateFireables = function( direction )
{
	var i = 0,
		object = null,
		intersection = null;

	for ( ; i < this.fireables.children.length; i++ )
	{
		intersection = null;
		object = this.fireables.children[ i ];
		object.update();

		if ( object.position.length() < 5000 )
		{
			object.position.add( direction.clone() );
			intersection = object.detectCollision( this.asteroids.children );
			if ( intersection !== null )
			{
				this.asteroids.remove( intersection.object );
				this.fireables.remove( object );
				i--;
			}
		}
		else
		{
			this.fireables.remove( object );
			i--;
		}
	}
};