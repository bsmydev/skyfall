SKY.Smoke = function()
{
	var geometry = new THREE.Geometry(),

		material = new THREE.ShaderMaterial( {

			uniforms : {

				uSize : { type : "f", value : 500 },
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

	geometry.vertices.push( new THREE.Vector3( -50, 0, 0 ), 
		new THREE.Vector3( 50, 0, 0 ),
		new THREE.Vector3( 0, 0, -50 ),
		new THREE.Vector3( 0, 0, 50 )  );

	THREE.ParticleSystem.call( this, geometry, material );
};


SKY.Smoke.prototype = new THREE.ParticleSystem();


SKY.Smoke.prototype.vertexShader = [

	'uniform float uSize;',

    'void main() {',

    	'vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );',
    	'gl_PointSize = uSize * ( 300.0 / length( mvPosition.xyz ) );',
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
}
