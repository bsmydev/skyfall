Flame = function()
{
	var geometry = new THREE.PlaneGeometry( 50, 50 ),
		texture = THREE.ImageUtils.loadTexture( "../img/texture.jpg" ),
		material = null;

		texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set( 2, 2 );
		
		// material = new THREE.ShaderMaterial( {

		// 	uniforms : {

		// 		texture : { type : "t", value : texture },
		// 		scrollSpeed : { type : "f", value : 50.0 },
		// 		time : { type : "f", value : 1.0 }

		// 	},
		// 	vertexShader : this.vertexShader,
		// 	fragmentShader : this.fragmentShader

		// } );

		material = new THREE.MeshBasicMaterial( { color : 0x000000 } );

	THREE.Mesh.call( this, geometry, material );
};


Flame.prototype = new THREE.Mesh();


Flame.prototype.vertexShader = [
	
	"uniform float scrollSpeed;",
	"uniform float time;",

	"varying vec2 vUv;",

	"void main() {",

		"vUv = vec2( uv.x + scrollSpeed, uv.y );",
		"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

	"}"

].join( "" );


Flame.prototype.fragmentShader = [

	"uniform sampler2D texture;",

	"varying vec2 vUv;",

	"void main() {",

		"gl_FragColor = texture2D( texture, vUv );",

	"}"

].join( "" );