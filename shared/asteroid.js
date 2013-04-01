SKY.Asteroid = function()
{
	var geometry = SKY.Geometries.asteroid,
		material = new THREE.MeshPhongMaterial( { color : 0xffffff } );

	THREE.Mesh.call( this, geometry, material );
};


SKY.Asteroid.prototype = new THREE.Mesh();