SKY.Collidable = function()
{
	this.perimeter = 500;

	this.detectCollision = function( collidables, callback )
	{
		var i = 0,
			j = 0,
			raycaster = null,
			vertex = null,
			position = this.matrixWorld.getPosition(),
			objects = [];

		/* Filter collidables to closer perimeter */
		for ( ; i < collidables.length; i++ )
		{
			if ( collidables[ i ].position.length() < this.perimeter )
			{
				objects.push( collidables[ i ] );
			}
		}


		for ( i = 0; i < this.geometry.vertices.length; i++ )
		{
			vertex = this.geometry.vertices[ i ].clone();
			vertex.applyMatrix4( this.matrixWorld );
			vertex.sub( position );
			raycaster = new THREE.Raycaster( position, vertex.clone() );

			intersections = raycaster.intersectObjects( objects, true );

			if ( intersections.length > 0 )
			{
				for ( j = 0; j < intersections.length; j++ )
				{
					if ( intersections[ j ].distance < vertex.length() )
					{
						callback( intersections[ j ] );
					}
				}	
			}
			
		}
	}	
};