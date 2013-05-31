SKY.Smoke = function()
{
	var geometry = new THREE.Geometry(),

		material = new THREE.ShaderMaterial( {

			uniforms : {

				uSize : { type : "f", value : 100 },
				texture : { type : "t", value : this.texture },
				uColor : { type : "c", value : new THREE.Color().setHex( 0xFF0000 ) }

			},
			vertexShader : this.vertexShader,
			fragmentShader : this.fragmentShader

		} ); 

	material.blendSrc = THREE.OneFactor;
	material.blendDst = THREE.OneFactor;
	material.blendEquation = THREE.AddEquation;

	material.side = THREE.DoubleSide;
	material.transparent = true;
	material.depthTest = true;
	material.depthWrite = false;

	( function(){

		var i = 0,
			count = 1000,
			position = null,
			axis = null,
			matrix = new THREE.Matrix4();

		for ( ; i < count; i++ )
		{
			position = new THREE.Vector3( 0, 0, 7000 );
			axis = new THREE.Vector3( Math.random() * 2 - 1, Math.random() * 2 - 1, 0 );
			
			matrix.identity();
			matrix.rotateByAxis( axis, Math.random() * 180 );
			position.applyMatrix4( matrix );
			//position.applyAxisAngle( axis, Math.random() * Math.PI );
			geometry.vertices.push( position );
		}

	} )();

	// geometry.vertices.push( new THREE.Vector3( -50, 0, 0 ), 
	// 	new THREE.Vector3( 50, 0, 0 ),
	// 	new THREE.Vector3( 0, 0, -50 ),
	// 	new THREE.Vector3( 0, 0, 50 )  );

	THREE.ParticleSystem.call( this, geometry, material );
};


SKY.Smoke.prototype = new THREE.ParticleSystem();


SKY.Smoke.prototype.vertexShader = [

	'uniform float uSize;',

    'void main() {',

    	'vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );',
    	'gl_PointSize = uSize * ( 3000.0 / length( mvPosition.xyz ) );',
        'gl_Position = projectionMatrix * mvPosition;',

    '}'

].join( "\n" );

SKY.Smoke.prototype.fragmentShader = [

    'uniform vec3 uColor;',
    'uniform sampler2D texture;',

    'void main() {',

        'vec4 noise = texture2D( texture, gl_PointCoord );',
        'gl_FragColor = vec4( uColor, noise.r * 0.5 );',

    '}'

].join( "\n" );

if ( SKY.CLIENT )
{
	SKY.Smoke.prototype.texture = THREE.ImageUtils.loadTexture( "img/smoke_noise.png" );
	//SKY.Smoke.prototype.texture = THREE.ImageUtils.loadTexture( "img/particle.png" );
}
