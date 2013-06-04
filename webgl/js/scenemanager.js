SKY.SceneManager = function(){

	this.scene = null;

	this.renderer = null;

};


SKY.SceneManager.prototype.init = function(){

	var self = this;

	this.scene = new THREE.Scene();

	this.environment = new SKY.Environment();
	SKY.App.environment = this.environment;
	this.scene.add( this.environment );


	this.spaceship = new SKY.Spaceship();
	this.scene.add( this.spaceship );

	/*
	*	Lights
	*/
	var light = new THREE.DirectionalLight( 0xffffff, 0.5 );

    light.position = new THREE.Vector3( 0, 1, 1 );
    this.scene.add( light );

    light = new THREE.AmbientLight( 0x202020 );
    this.scene.add( light );

	this.renderer = new SKY.Renderer( this.scene, this.spaceship.camera );

};

SKY.SceneManager.prototype.animate = function(){

	var self = this;

	SKY.Clock.tick();

	this.spaceship.animate();
	this.environment.update();

	this.renderer.render();

	requestAnimationFrame( self.animate.bind( self ) );

};