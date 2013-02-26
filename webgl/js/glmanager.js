SKY.GLManager = ( function()
{
	var _renderer = null,
		_composer = null,
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
				url : 'models/rock1.js',
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
				console.log( _models[ 0 ] + ' loaded!' );
				
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

			if ( _airplane.updateControls !== undefined )
			{
				_airplane.updateControls();
				//_environment.position.add( new THREE.Vector3( 0, -1, 0 ).multiplyScalar( _environment.fallingSpeed ) );
				_environment.fall();
				_environment.position.add( _airplane.direction.clone().multiplyScalar( _airplane.speed ) );
			}

			_renderer.clear();
			_composer.render();

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

        	_camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
        	_camera.position.y = 0;
        	_camera.position.z = -100;
        	_camera.lookAt( new THREE.Vector3( 0, 0, 1 ) );
        	_camera.up = new THREE.Vector3( 0, 1, 0 );

        	_light = new THREE.DirectionalLight( 0xffffff, 0.5 );
        	_light.position = new THREE.Vector3( 0, 1, 1 );
        	_scene.add( _light );

        	_skybox = new SKY.Skybox();
        	_scene.add( _skybox );

        	_environment = new SKY.Environment();
        	_environment.position = new THREE.Vector3( 0, 0, -5000 );
        	_scene.add( _environment );

        	_airplane = new SKY.Airplane();
        	_scene.add( _airplane );
			_camera = _airplane.camera;
        	
        	
        	_airplane.lookAt( new THREE.Vector3( 1, 0, 0 ) );

        	SKY.Controls.enable();

        	/*
        	*	Setup rendering
        	*/
        	_renderer = new THREE.WebGLRenderer( {

	            canvas : document.getElementById( "canvas" ),
	            antialias : true

        	} );
        	_renderer.autoClear = false;
			_renderer.setSize( window.innerWidth, window.innerHeight );

			_composer = new THREE.EffectComposer( _renderer );

			_composer.addPass( new THREE.RenderPass( _scene, _camera ) );

			pass = new THREE.ShaderPass( THREE.CopyShader );
			pass.renderToScreen = true;
			_composer.addPass( pass );

        	_animate();
		},

		configure : function()
		{

		}

	}

} )();