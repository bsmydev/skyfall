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


SKY.Environment.prototype.fall = function( direction )
{
	var i = 0,
		object = null,
		fall = null,
		position = null;

	/*
	 *	Objects shall fall with different speed 
	 *	otherwise it looks like the plane is going up
	 */ 

	for ( ; i < this.asteroids.children.length; i++ )
	{
		object = this.asteroids.children[ i ];

		if ( object.position.length() < 5000 )
		{
			fall = direction.clone();
			object.position.add( fall );
		}
		else
		{
			/* Make asteroids appear in front of the ship */
			position = direction.clone().normalize().negate().setLength( 3000 * Math.random() + 2000 );
			position.applyMatrix4( new THREE.Matrix4().makeRotationY( THREE.Math.degToRad( 180 * Math.random() - 90 ) ) );
			position.add( SKY.App.airplane.up.clone().setLength( Math.random() * 5000 - 2500 ) );
			object.position = position;
		}
	}

};


SKY.Environment.prototype.update = function( direction )
{
	this.fall( direction );
	this.updateFireables( direction );
};


SKY.Environment.prototype.updateFireables = function( direction )
{
	var i = 0,
		object = null,
		self = this;

	for ( ; i < this.fireables.children.length; i++ )
	{
		object = this.fireables.children[ i ];
		object.update();

		if ( object.position.length() < 5000 )
		{
			object.position.add( direction.clone() );
			object.detectCollision( this.asteroids.children, function ( intersection )
			{
				self.asteroids.remove( intersection.object );
				self.fireables.remove( object );
				i--;
			} );
		}
		else
		{
			this.fireables.remove( object );
			i--;
		}
	}
};