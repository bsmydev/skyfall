SKY.FireableObject = function( parameters )
{
	parameters = parameters || {};

	this.speed = parameters.speed !== undefined ? parameters.speed : 15;

	this.direction = parameters.direction !== undefined ? parameters.direction : new THREE.Vector3( 0, 0, 1 );
	this.force = parameters.force !== undefined ? parameters.force : 10;
	this.maxSpeed = parameters.maxSpeed !== undefined ? parameters.maxSpeed : 20;

	this.lookAt( this.direction );

	this.update = function()
	{
		if ( this.speed < this.maxSpeed )
		{
			this.speed += 0.1;
		}
		this.position.add( this.direction.clone().multiplyScalar( this.speed * SKY.Clock.speed() ) );
	};
	
};

