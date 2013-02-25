SKY.Meteorite = function()
{
	var geometry = new THREE.PlaneGeometry( 25, 25 ),
		texture = THREE.ImageUtils.loadTexture( "img/texture.jpg" ),
		material = null;

		texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set( 2, 2 );
		
		material = new THREE.ShaderMaterial( {

			uniforms : {

				texture : { type : "t", value : texture },
				scrollSpeed : { type : "f", value : 50.0 },
				time : { type : "f", value : 1.0 }

			},
			vertexShader : this.vertexShader,
			fragmentShader : this.fragmentShader

		} );

	THREE.Mesh.call( this, geometry, material );
};


SKY.Meteorite.prototype = new THREE.Mesh();


SKY.Meteorite.prototype.vertexShader = [
	
	"uniform float scrollSpeed;",
	"uniform float time;",

	"varying vec2 vUv;",

	"void main() {",

		"vUv = vec2( uv.x + scrollSpeed, uv.y );",
		"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

	"}"

].join( "" );


SKY.Meteorite.prototype.fragmentShader = [

	"uniform sampler2D texture;",

	"varying vec2 vUv;",

	"void main() {",

		"gl_FragColor = texture2D( texture, vUv );",

	"}"

].join( "" );