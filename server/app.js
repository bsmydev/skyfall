/* Node Modules */
FS = require( 'fs' );

THREE = require( './three.js' );

SKY = {};

SKY.SERVER = true;

( function(){

	var loader = new THREE.JSONLoader(),
		models  = [ 
			{
				url : './shared/models/rock.js',
				label : 'asteroid'
			},
			{
				url : './shared/models/plane.js',
				label : 'plane'
			},
			{
				url : './shared/models/ship.js',
				label : 'ship'
			}
		],

	loadModels = function()
	{
		var i = 0,
			content = "";

		for ( ; i < models.length; i++ )
		{
			content = FS.readFileSync( models[ i ].url, { encoding : 'utf8' } );
			models[ i ].json = JSON.parse( content );
		}
	};

	createModels = function( callback )
	{
		loader.createModel( models[ 0 ].json, function ( geometry )
		{
			console.log( models[ 0 ].label + ' geometry loaded!' );
			
			if ( SKY.Geometries === undefined ){ SKY.Geometries = {}; }
			SKY.Geometries[ models[ 0 ].label ] = geometry;

			models.shift();

			if ( models.length > 0 )
			{
				createModels( callback );
			}
			else
			{
				callback();
			}
		} );
	};

	SKY.App = {
		
		start : function()
		{
			loadModels();

			if ( models.length > 0 )
			{
				createModels( this.start );
				return;
			}

			console.log( 'started' );
			new SKY.Engine();

		}

	};

} )();

/*
*	Game engine
*/
require( './engine.js' );

require( './shared/spaceship.js' );
require( './shared/clock.js' );
require( './shared/environment.js' );
require( './shared/skybox.js' );
require( './shared/asteroid.js' );
require( './shared/missile.js' );
require( './shared/fireableobject.js' );
require( './shared/flyableobject.js' );
require( './shared/collidable.js' );


SKY.App.start();

