SKY.Renderer = function ( scene, camera )
{
	this._renderer = new THREE.WebGLRenderer( {

		canvas : document.getElementById( "canvas" ),
		antialias : true,

	} );
	this._renderer.autoClear = false;
	this._renderer.setSize( window.innerWidth, window.innerHeight );

	/*
	 *	Create passes
	 */
	this._renderPass = new THREE.RenderPass( scene, camera );
	this._savePass = new THREE.SavePass();

	this._blendPass = new THREE.ShaderPass( THREE.BlendShader, "tDiffuse1" );
	this._blendPass.uniforms.tDiffuse2.value = this._savePass.renderTarget;
	this._blendPass.uniforms.mixRatio.value = 0.65;

	this._copyPass = new THREE.ShaderPass( THREE.CopyShader );
	this._copyPass.renderToScreen = true;

	/* 
	 *	Create pass chains
	 */

	this._blurChain = [ this._renderPass, this._blendPass, this._savePass, this._copyPass ];
	this._classicChain = [ this._renderPass, this._copyPass ];

	this._composer = new THREE.EffectComposer( this._renderer );
};

SKY.Renderer.prototype = {

	render : function()
	{
		if ( SKY.blur )
		{
			this._composer.passes = this._blurChain;
		}
		else
		{
			this._composer.passes = this._classicChain;
		}
		this._renderer.clear();
		this._composer.render();
	}

};