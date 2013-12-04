SKY.Collidable = function( parameters )
{
	parameters = parameters || {};

	var detector = parameters.detector,
		perimeter = parameters.perimeter !== undefined ? parameters.perimeter : 200,

		/*
		 *	Filter collidables that are close to detector
		 */ 
		filter = function( objects ) {

			var filtered = [],
				i = 0,
				objectPosition = null,
				detectorPosition = detector.matrixWorld.getPosition().clone();

			for ( ; i < objects.length; i++ )
			{
				objectPosition = objects[ i ].matrixWorld.getPosition().clone();
				if ( objectPosition.sub( detectorPosition ).length() < perimeter )
				{
					filtered.push( objects[ i ] );
				}
			}

			return filtered;

		};

	this.detectCollision = function( collidables, callback )
	{
		var i = 0,
			j = 0,
			raycaster = null,
			vertex = null,
			position = this.matrixWorld.getPosition(),
			objects = filter( collidables );


		for ( i = 0; i < detector.geometry.vertices.length; i++ )
		{
			vertex = detector.geometry.vertices[ i ].clone();
			vertex.applyMatrix4( detector.matrixWorld );
			vertex.sub( position );
			raycaster = new THREE.Raycaster( position, vertex.clone() );

			intersections = raycaster.intersectObjects( objects, true );

			if ( intersections.length > 0 )
			{
				for ( j = 0; j < intersections.length; j++ )
				{
					if ( intersections[ j ].distance < vertex.length() )
					{
						return intersections[ j ];
					}
				}	
			}
			
		}

		return null;
	};

	/* Hide detector */
	detector.traverse( function ( object ) { object.visible = false; } );
};