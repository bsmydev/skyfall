SKY.FlyableObject = function() {

	this.speed = 5;

	this.direction = new THREE.Vector3( 0, 0, 1 );

	this.yaw = function( degrees )
	{
		var matrix = new THREE.Matrix4().makeRotationAxis( this.up, degrees * ( Math.PI / 180 ) );

		this.direction.applyMatrix4( matrix );
		this.lookAt( this.position.clone().add( this.direction.clone() ) );
	};


	this.roll = function( degrees )
	{
		var matrix = new THREE.Matrix4().makeRotationAxis( this.direction, degrees * ( Math.PI / 180 ) );

		this.up.applyMatrix4( matrix );
		this.lookAt( this.position.clone().add( this.direction.clone() ) );
	};


	this.pitch = function( degrees )
	{
		var axis = new THREE.Vector3().crossVectors( this.direction, this.up ),
			matrix = new THREE.Matrix4().makeRotationAxis( axis, degrees * ( Math.PI / 180 ) );

		this.up.applyMatrix4( matrix );
		this.direction.applyMatrix4( matrix );
		this.lookAt( this.position.clone().add( this.direction.clone() ) );
	};


	/*
	*	Rotate around tunnel direction
	*/
	this.move = function( degrees ){

		var direction = SKY.Environment.direction,
			position = this.position,
			oPosition = position.clone(),
			rMatrix = new THREE.Matrix4();

		rMatrix.makeRotationAxis( direction, degrees * Math.PI / 180 );

		position.applyMatrix4( rMatrix );
		this.up.applyMatrix4( rMatrix );
		this.lookAt( this.position.clone().add( this.direction.clone() ) );

		this.movement = oPosition.sub( position );
	}

	this.updateControls = function()
	{
		if ( SKY.Controls.UP )
		{
			//this.pitch( -1 );
		}
		if ( SKY.Controls.DOWN )
		{
			//this.pitch( 1 );
		}
		if ( SKY.Controls.LEFT )
		{
			this.move( -2 );
		}
		if ( SKY.Controls.RIGHT )
		{
			this.move( 2 );
		}
	}

};