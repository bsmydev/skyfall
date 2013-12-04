SKY.GLManager = ( function()
{
	var _paused = false,
		_scene = null,
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
			},
			{
				url : 'models/ship.js',
				label : 'ship'
			}
		],
		_textures = [

			{
				method : 'loadTextureCube',
				url : [ 'img/nx.png', 'img/px.png','img/py.png','img/ny.png','img/pz.png','img/nz.png' ],
				label : 'skybox'
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

		_loadTextures = function( callback )
		{
			var toLoad = _textures.shift();

			new THREE.ImageUtils[ toLoad.method ]( toLoad.url, undefined, function( texture ){

				if ( SKY.Textures === undefined ){ SKY.Textures = {}; }
				SKY.Textures[ toLoad.label ] = texture;

				if ( _textures.length > 0 )
				{
					_loadTextures( callback );
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

			if ( !_paused )
			{
				_airplane.animate();
				_environment.update( _airplane.direction.clone().multiplyScalar( _airplane.speed * SKY.Clock.speed() ) );
				_renderer.render();
			}			

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
				SKY.Home.message( "loading models" );
				_loadModels( this.start );
				return;
			}

			/*
			 * Load textures synchronously
			 */
			if ( _textures.length > 0 )
			{
				SKY.Home.message( "loading textures" );
				_loadTextures( SKY.GLManager.start );
				return;
			}

			
			/* 
			*	Setup scene
			*/
			SKY.Home.message( "setting up scene" );

			_scene = new THREE.Scene();
			SKY.App.scene = _scene;


			_light = new THREE.DirectionalLight( 0xffffff, 0.5 );
			_light.position = new THREE.Vector3( 0, 1, 1 );
			_scene.add( _light );

			_skybox = new SKY.Skybox();
			_scene.add( _skybox );

			_environment = new SKY.Environment();
			_scene.add( _environment );
			SKY.App.environment = _environment;

			_airplane = new SKY.Airplane( { collidables : _environment.asteroids.children } );
			SKY.App.airplane = _airplane;

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

			SKY.Home.message( "ready" );

			/* Pause game right away */
			_paused = true;

			SKY.App.started();
		},

		configure : function()
		{

		},

		pause : function() {

			_paused = !_paused;
			SKY.Home.toggle( _paused );

		}

	};

} )();