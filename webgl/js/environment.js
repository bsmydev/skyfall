SKY.Environment = function()
{
	THREE.Object3D.call( this );
	
	var geometry = new THREE.CubeGeometry( 25, 25, 25 ),
		cubeMaterial = new THREE.MeshBasicMaterial( { wireframe : true } ),
		cloudMaterial = new THREE.MeshBasicMaterial( { color : 0x000000 } ),
		object = null,
		i = 0;
	

	this.cubes = new THREE.Object3D();
	this.add( this.cubes );
	for ( ; i < 1000; i++ )
	{
		object = new THREE.Mesh( geometry, cubeMaterial );
		object.position = new THREE.Vector3( 10000 * Math.random() - 5000, 10000 * Math.random(), 10000 * Math.random() - 5000 );
		object.weight = Math.floor( 10 * Math.random() );
		this.cubes.add( object );
	}

	this.clouds = new THREE.Object3D();
	this.add( this.clouds );
	for ( i = 0; i < 100; i++ )
	{
		object = new THREE.Mesh( geometry, cloudMaterial );
		object.position = new THREE.Vector3( 10000 * Math.random() - 5000, 500 * Math.random() - 250, 10000 * Math.random() - 5000 );
		this.clouds.add( object );
	}

	this.fallingSpeed = 5;


};

SKY.Environment.prototype = new THREE.Object3D();


SKY.Environment.prototype.fall = function()
{
	var i = 0,
		cube = null;

	/*
	 *	Objects shall fall with different speed 
	 *	otherwise it looks like the plane is going up
	 */

	for ( ; i < this.cubes.children.length; i++ )
	{
		cube = this.cubes.children[ i ];
		cube.position.add( new THREE.Vector3( 0, - cube.weight, 0 ) );
	}
};


SKY.Environment.prototype.update = function()
{
	this.fall();
};