SKY.FlyableObject = function() {

	this.speed = 5;

	this.direction = new THREE.Vector3( 0, 0, 1 );

	this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 100000);
	this.add( this.camera );

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
			this.pitch( 1 );
		}
		if ( SKY.Controls.DOWN )
		{
			this.pitch( -1 );
		}
		if ( SKY.Controls.LEFT )
		{
			this.roll( 1 );
		}
		if ( SKY.Controls.RIGHT )
		{
			this.roll( -1 );
		}
	}

};