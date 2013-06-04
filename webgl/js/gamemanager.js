SKY.GameManager = function(){

	var self = this;

	this.jsonLoader = new THREE.JSONLoader();
	this.models = [
		{
			url : 'shared/models/rock.js',
			label : 'asteroid'
		},
		{
			url : 'shared/models/ship_inverted.js',
			label : 'ship'
		}
	];

	this.loadModels( function(){

		self.start();

	} );

};


SKY.GameManager.prototype.start = function(){

	/*
	* Start clock
	*/
	SKY.Clock.start();

	this.sceneManager = new SKY.SceneManager();
	this.sceneManager.init();
	this.sceneManager.animate();

	SKY.Controls.enable();

};


SKY.GameManager.prototype.loadModels = function( callback ){

	var self = this,
		loader = this.jsonLoader,
		models = this.models,
		model = models.shift(),
		geometries = {};

	SKY.Geometries = SKY.Geometries || {};

	loader.load( model.url, function ( geometry ) {

		console.log( model.label + ' geometry loaded!' );
		
		SKY.Geometries[ model.label ] = geometry;

		if ( models.length > 0 )
		{
			self.loadModels( callback );
		}
		else
		{
			callback();
		}

	} );

};
