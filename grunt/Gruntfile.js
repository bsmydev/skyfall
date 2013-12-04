var concat = require( './concat' );

module.exports = function( grunt ) {

	var jsFiles = grunt.file.readJSON( 'js.json' );

	grunt.initConfig( {

		src : '../src',
		dest : '../build',

		pkg : grunt.file.readJSON( 'package.json' ),

		deployTarget : grunt.option( 'target' ) || '../deploy',

		less : {

			development : {

				options : {


				},
				files: {

				  "<%=dest%>/style.css" : "<%=src%>/styles/main.less"

				}

			}

		},
		concat : {

			development : {

				files : [ jsFiles.skyfall, jsFiles.three ]

			}

		},
		copy : {

			development : {

				files : [ { 

					expand : true,
					cwd: '<%=src%>/static/',
					src : [ "**/*" ],
					dest : "<%=dest%>/"

				} ]

			},

			deploy : {

				files : [ {

					expand : true,
					cwd: '<%=dest%>',
					src : [ "**/*" ],
					dest : "<%=deployTarget%>/"

				} ]

			}

		},

		jshint : {

			beforeConcat : { files : jsFiles.skyfall }

		}

	} );

	grunt.loadNpmTasks( 'grunt-contrib-less' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );

	/*
	*	The concat module auto register to the grunt taskslist
	*/
	concat( grunt );

	grunt.registerTask( 'default', [ 'copy', 'less', 'jshint', 'concat', 'copy:deploy' ] );


};