SKY.GLManager = ( function()
{
	var _renderer = null,
		_composer = null,
		_scene = null,
		_camera = null,
		_skybox = null,
		_controls = null,

		_animate = function()
		{
			var i = 0,
				child = null;
			
			for ( ; i < _scene.children.length; i++ )
			{
				child = _scene.children[ i ];
				if ( child.update )
				{
					child.update();
				}
			}

			_camera.rotation.y += Math.PI / 4 * 0.01;
			_renderer.clear();
			_composer.render();

			requestAnimationFrame( _animate );
		};

	return {

		start : function()
		{
			var pass = null;
			/* 
			*	Setup scene
			*/

        	_scene = new THREE.Scene();

        	_camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
        	_camera.position.y = 0;
        	_camera.position.z = 0;
        	_camera.lookAt( new THREE.Vector3( 0, 0, 1 ) );
        	_camera.up = new THREE.Vector3( 0, 1, 0 );

   			//_controls = new THREE.FlyControls( _camera );

        	_skybox = new SKY.Skybox();
        	_scene.add( _skybox );

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