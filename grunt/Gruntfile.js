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

				files : [ jsFiles ]

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

		}

	} );

	grunt.loadNpmTasks( 'grunt-contrib-less' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );

	/*
	*	The concat module auto register to the grunt taskslist
	*/
	concat( grunt );

	grunt.registerTask( 'default', [ 'copy', 'less', 'concat', 'copy:deploy' ] );


};