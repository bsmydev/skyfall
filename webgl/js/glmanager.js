SKY.GLManager = ( function()
{
	var _scene = null,
		_camera = null,
		_skybox = null,
		_airplane = null,
		_light = null,
		_ambient = null,
		_environment = null,
		_loader = new THREE.JSONLoader(),
		_models = [ 
			{
				url : 'models/rock.js',
				label : 'meteorite'
			},
			{
				url : 'models/plane.js',
				label : 'plane'
			} 
		],

		_loadModels = function( callback )
		{
			_loader.load( _models[ 0 ].url, function ( geometry )
			{
				console.log( _models[ 0 ].label + ' geometry loaded!' );
				
				if ( SKY.Geometries === undefined ){ SKY.Geometries = {}; }
				SKY.Geometries[ _models[ 0 ].label ] = geometry;

				_models.shift();

				if ( _models.length > 0 )
				{
					_loadModels( callback );
				}
				else
				{
					callback();
				}
			} );
		},

		_animate = function()
		{
			var i = 0,
				child = null;

			SKY.Clock.tick();

			_airplane.animate();
			
			_environment.fall( _airplane.direction.clone().multiplyScalar( _airplane.speed * SKY.Clock.speed() ) );


			_renderer.render();

			requestAnimationFrame( _animate );
		};

	return {

		start : function()
		{
			var pass = null,
				self = this;

			/*
			 * Load Models synchronously
			 */
			if ( _models.length > 0 )
			{
				_loadModels( this.start );
				return;
			}

			
			/* 
			*	Setup scene
			*/

        	_scene = new THREE.Scene();

        	_light = new THREE.DirectionalLight( 0xffffff, 0.5 );
        	_light.position = new THREE.Vector3( 0, 1, 1 );
        	_scene.add( _light );

        	_skybox = new SKY.Skybox();
        	_scene.add( _skybox );

        	_environment = new SKY.Environment();
        	_scene.add( _environment );

        	_airplane = new SKY.Airplane( { collidables : _environment.asteroids.children } );
        	_airplane.lookAt( new THREE.Vector3( 0, 0, -1 ) );
        	_scene.add( _airplane );
			_camera = _airplane.camera;

        	SKY.Controls.enable();

        	/*
        	*	Setup rendering
        	*/
        	_renderer = new SKY.Renderer( _scene, _camera );

			/* Start clock */
			SKY.Clock.start();

        	_animate();
		},

		configure : function()
		{

		}
	}

} )();