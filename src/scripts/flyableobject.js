SKY.FlyableObject = function() {

	this.speed = 5;

	this.direction = new THREE.Vector3( 0, 0, 1 );
	this.lookAt( this.direction );

	this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 100000);
	this.add( this.camera );

	this.pitchInertia = 0;
	this.rollInertia = 0;

	this.yaw = function( degrees )
	{
		var matrix = new THREE.Matrix4().makeRotationAxis( this.up, degrees * ( Math.PI / 180 ) );

		this.direction.applyMatrix4( matrix );
		this.lookAt( this.direction );
	};


	this.roll = function( degrees )
	{
		var matrix = new THREE.Matrix4().makeRotationAxis( this.direction, degrees * ( Math.PI / 180 ) );

		this.up.applyMatrix4( matrix );
		this.lookAt( this.direction );
	};


	this.pitch = function( degrees )
	{
		var axis = new THREE.Vector3().crossVectors( this.direction, this.up ),
			matrix = new THREE.Matrix4().makeRotationAxis( axis, degrees * ( Math.PI / 180 ) );

		this.up.applyMatrix4( matrix );
		this.direction.applyMatrix4( matrix );
		this.lookAt( this.direction );
	};


	this.updateControls = function()
	{

		if ( SKY.Controls.UP )
		{
			this.pitchInertia = Math.min( 1, this.pitchInertia + 0.1 );
		}
		if ( SKY.Controls.DOWN )
		{
			this.pitchInertia = Math.max( -1, this.pitchInertia - 0.1 );
		}
		if ( SKY.Controls.LEFT )
		{
			this.rollInertia = Math.min( 2, this.rollInertia + 0.1 );
		}
		if ( SKY.Controls.RIGHT )
		{
			this.rollInertia = Math.max( -2, this.rollInertia - 0.1 );
		}


		this.pitch( this.pitchInertia );
		this.roll( this.rollInertia );

		this.pitchInertia = this.pitchInertia * 0.975;
		this.rollInertia = this.rollInertia * 0.975;

	};

};