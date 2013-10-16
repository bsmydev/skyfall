module.exports = function( grunt ) {

	grunt.registerMultiTask( 'concat', function() {

		this.files.forEach( function ( gruntFile ) {

			var contents = [],
				files = gruntFile.src.filter( function ( filePath ) {

				if ( ! grunt.file.exists( filePath ) )
				{
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				}
				else
				{
					return true;
				}

			} );

			files.forEach( function ( filePath ){

				contents.push( grunt.file.read( filePath ) );

			} );

			grunt.file.write( gruntFile.dest, contents.join( '\n\n' ) );

		} );

	} );

};