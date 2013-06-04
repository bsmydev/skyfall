SKY.Trail = function( parameters ){
	
	var parameters = parameters || {},
		geometry = new THREE.Geometry(),
		material = new THREE.ShaderMaterial( { 

			uniforms : {

				uColor : { type : 'c', value : new THREE.Color().setHex( parameters.color !== undefined ? parameters.color : 0xffffff ) },
				uSize : { type : 'f', value : 20.0 },
				uTrailLength : { type : 'f', value : 50.0 },
				uTime : { type : 'f', value : 0.0 },
				texture : { type : 't', value : this.texture },

			},

			attributes : {

				aDelta : { type : 'v3', value : [] }

			},
			vertexShader : this.vertexShader,
			fragmentShader : this.fragmentShader,
			depthTest : false,
			transparent : true

		 } ),

		nbParticles = 20,
		trailLength = 50;

	( function(){

		var i = 0;

		for ( ; i < nbParticles; i++ )
		{

			geometry.vertices.push( new THREE.Vector3( 0, 0, - ( i * ( trailLength / nbParticles ) ) ) );
			material.attributes.aDelta.value.push( new THREE.Vector3() );

		}

	} )();
	
	/*  */
	this.lastMovement = new THREE.Vector3();

	THREE.ParticleSystem.call( this, geometry, material );

};


SKY.Trail.prototype = new THREE.ParticleSystem();


SKY.Trail.prototype.update = function( movement ){

	var self = this,
		delta = movement.clone().sub( this.lastMovement );

	/* Keep track of delta */
	this.lastMovement = movement;

	if ( this.time === undefined )
	{
		this.time = 0;
	}
	this.time += SKY.Clock.ellapsed();
	this.material.uniforms.uTime.value = this.time;
	this.material.uniforms.uTime.needsUpdate = true;

	( function(){

		var values = self.material.attributes.aDelta.value,
			length = values.length,
			i = 0;

		delta.applyMatrix4( self.matrixWorld ).negate();
		delta.z = 0;
		delta.normalize();

		for ( ; i < length; i++ )
		{
			var oPosition = self.geometry.vertices[ i ];
			//values[ i ].add( values[ i ].clone().sub( oPosition ).multiplyScalar( 0.75 ) );
			values[ i ].add( delta.clone().multiplyScalar( i / length ) );
			//values[ i ].setLength( i / length / 50 );
		}


	} )();

	this.material.attributes.aDelta.needsUpdate = true;
	


};


SKY.Trail.prototype.vertexShader = [
	

	'uniform float uSize;',
	'uniform float uTrailLength;',
	'uniform float uTime;',

	'attribute vec3 aDelta;',
	
	'varying float vOpacity;',

	'void main() {',

		'/* Update particle position */',
		'vec3 newPosition = vec3( position );',
		
		'newPosition += aDelta;',
		//'newPosition.z = - mod( ( uTime + abs( position.z ) ), uTrailLength );',

		//'vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );',
		'vec4 mvPosition = modelViewMatrix * vec4( newPosition, 1.0 );',

		'vOpacity = 1.0 - min( 1.0, ( abs( floor( newPosition.z ) ) / uTrailLength ) );',
		//'vOpacity = 1.0;',
		//'vOpacity = 1.0 - 0.5;',

		'gl_PointSize = uSize * ( 300.0 / length( mvPosition.xyz ) );',
		'gl_Position = projectionMatrix * mvPosition;',

	'}'

].join( '\n' );


SKY.Trail.prototype.fragmentShader = [

	'uniform vec3 uColor;',
	'uniform sampler2D texture;',

	'varying float vOpacity;',

	'void main() {',

		'vec4 noise = texture2D( texture, gl_PointCoord );',
		'noise.a = noise.a * vOpacity;',
		'gl_FragColor = vec4( uColor, noise.a );',

	'}'

].join( '\n' );


if ( SKY.CLIENT )
{
	SKY.Trail.prototype.texture = THREE.ImageUtils.loadTexture( 'img/particle.png' );
}