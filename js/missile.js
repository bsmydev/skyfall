SKY.Missile = function( parameters )
{
	var parameters = parameters || {},
		geometry = new THREE.Geometry(),
		material = new THREE.ShaderMaterial( { 

			uniforms : {

				uColor : { type : 'c', value : new THREE.Color().setHex( parameters.color !== undefined ? parameters.color : 0xffffff ) },
				uSize : { type : 'f', value : 50.0 },
				texture : { type : 't', value : this.texture }

			},

			attributes : {

				aOpacity : { type : 'f', value : [] }

			},
			vertexShader : this.vertexShader,
			fragmentShader : this.fragmentShader,
			depthTest : true,
			transparent : true

		 } );

	geometry.vertices.push( new THREE.Vector3() );
	material.attributes.aOpacity.value.push( 1.0 );

	THREE.ParticleSystem.call( this, geometry, material );

	/*
	*	Make it fireable
	*/

	parameters.speed = 30;
	SKY.FireableObject.call( this, parameters );

	/*
	*	Collision line
	*/
	geometry = new THREE.Geometry();
	geometry.vertices.push( new THREE.Vector3( 0, 0, -30 ) );
	geometry.vertices.push( new THREE.Vector3( 0, 0, 30 ) );

	material = new THREE.LineBasicMaterial( { color : 0xff0000 } );     

	this.collisionTool = new THREE.Line( geometry, material );
	SKY.Collidable.call( this, { detector : this.collisionTool } );
	this.add( this.collisionTool );

};

SKY.Missile.prototype = new THREE.ParticleSystem();


SKY.Missile.prototype.vertexShader = [

	'uniform float uSize;',
	// 'attribute vec3 aColor;',
	'attribute float aOpacity;',
	
	// 'varying vec3 vColor;',
	'varying float vOpacity;',

	'void main() {',

		'vOpacity = aOpacity;',

		'vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );',

		'gl_PointSize = uSize * ( 300.0 / length( mvPosition.xyz ) );',
		'gl_Position = projectionMatrix * mvPosition;',

	'}'

].join( '\n' );


SKY.Missile.prototype.fragmentShader = [

	'uniform vec3 uColor;',
	'uniform sampler2D texture;',

	'varying float vOpacity;',

	'void main() {',

		'vec4 noise = texture2D( texture, gl_PointCoord );',
		'gl_FragColor = vec4( uColor, noise.a );',

	'}'

].join( '\n' );


SKY.Missile.prototype.texture = THREE.ImageUtils.loadTexture( 'img/particle.png' );