SKY.Meteorite = function()
{
	var geometry = SKY.Geometries.meteorite,
		material = new THREE.MeshPhongMaterial( { color : 0x000000 } );

	THREE.Mesh.call( this, geometry, material );
};


SKY.Meteorite.prototype = new THREE.Mesh();