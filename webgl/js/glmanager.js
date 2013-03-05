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

			_airplane.animate();
			_airplane.collisionBox.detectCollision( _environment.cubes.children, function ( intersection )
				{
					console.log( intersection );
				} );
			_environment.fall( _airplane.direction.clone().multiplyScalar( _airplane.speed ) );


			_renderer.clear();
			_composer.render();

			requestAnimationFrame( _animate );
		},

	    addPass = function( pass )
	    {
	        if ( _composer.index === undefined ){ _composer.index = 1; }

	        _composer.passes.splice( _composer.index, 0, pass );
	        _composer.index++;
	    },

	    removePass = function( pass )
	    {
	        var i = 0;

	        for ( ; i < _composer.passes.length; i++ )
	        {
	            if ( pass === _composer.passes[ i ] )
	            {
	                _composer.passes.splice( i, 1 );
	                break;
	            }            
	        }
	        _composer.index--;
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

        	_airplane = new SKY.Airplane();
        	_airplane.lookAt( new THREE.Vector3( 0, 0, -1 ) );
        	_scene.add( _airplane );
			_camera = _airplane.camera;

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

			_composer.savePass = new THREE.SavePass();

			_composer.blendPass = new THREE.ShaderPass( THREE.BlendShader, "tDiffuse1" );
			_composer.blendPass.uniforms.tDiffuse2.value = _composer.savePass.renderTarget;
			_composer.blendPass.uniforms.mixRatio.value = 0.65;

			pass = new THREE.ShaderPass( THREE.CopyShader );
			pass.renderToScreen = true;
			_composer.addPass( pass );

        	_animate();
		},

		configure : function()
		{

		},

		enableMotionBlur : function()
		{
			if ( ! _composer.blur )
			{
				addPass( _composer.blendPass );
				addPass( _composer.savePass );
				_composer.blur = true;
			}
		},

		disableMotionBlur : function()
		{
			if ( _composer.blur )
			{
				removePass( _composer.blendPass );
				removePass( _composer.savePass );
				_composer.blur = false;
			}
		}
	}

} )();