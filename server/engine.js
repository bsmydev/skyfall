SKY.Engine = function()
{
	var scene = new THREE.Scene(),
		self = this;

	this.scene = scene;

	( function(){

		var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
		light.position = new THREE.Vector3( 0, 1, 1 );
		scene.add( light );

	} )();
    
	scene.add( new SKY.Skybox() );	


	( function(){

		var environment = new SKY.Environment();

		scene.add( environment );

		self.environment = environment;

	} )();


	( function(){

		var spaceship = new SKY.Airplane();

		spaceship.lookAt( new THREE.Vector3( 0, 0, -1 ) );
		scene.add( spaceship );
		SKY.App.airplane = spaceship;
		self.spaceship = spaceship;

	} )();

	/* Start clock */
	SKY.Clock.start();

	this.loop();
};

SKY.Engine.prototype.loop = function(){

	var self = this;

	SKY.Clock.tick();

	this.spaceship.animate();
	this.environment.update( this.spaceship.direction.clone().multiplyScalar( this.spaceship.speed * SKY.Clock.speed() ) );

	if ( this.loopInterval === undefined )
	{
		this.loopInterval = setInterval( function(){

			self.loop();

		}, 45 );

	}

};