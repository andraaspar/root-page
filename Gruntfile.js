module.exports = function(grunt) {
	
	grunt.initConfig((function() {
		
		var config = {
			AT_CSS_PATH: '<%= AT_PATH %>style/andraaspar.css',
			AT_JS_PATH: '<%= AT_PATH %>script/andraaspar.min.js',
			AT_PATH: 'tmp/asset_templates/',
			BUILD_PATH: 'build/',
			CC_PATH: 'tmp/concat/',
			TEMP_JS_PATH: 'tmp/script/andraaspar.js',
			TEMP_JS_MIN_PATH: 'tmp/script/andraaspar.min.js',

			clean: {
				compile: ['build', 'tmp']
			},
			concat: {
				compile: {
					src: ['src/concat/modernizr.custom.02462.js', 'src/concat/jquery-1.11.2.min.js', '<%= TEMP_JS_MIN_PATH %>'],
					dest: '<%= AT_JS_PATH %>'
				}
			},
			copy: {
				debug: {
					files: [
						{src: ['<%= TEMP_JS_PATH %>'], dest: '<%= TEMP_JS_MIN_PATH %>'}
					]
				},
				compile: {
					files:[{
						expand: true,
						cwd: 'src/dropin',
						dot: true,
						src: ['**'],
						dest: '<%= BUILD_PATH %>'
					}, {
						expand: true,
						cwd: 'tmp/dropin',
						dot: true,
						src: ['**'],
						dest: '<%= BUILD_PATH %>'
					}]
				}
			},
			kapocs: {
				compile: {
					assets: [{
						expand: true,
						cwd: 'src/assets',
						dot: true,
						src: ['**'],
						dest: '<%= BUILD_PATH %>'
					}],
					assetTemplates: [{
						expand: true,
						cwd: 'src/asset_templates',
						dot: true,
						src: ['**'],
						dest: '<%= BUILD_PATH %>'
					}, {
						expand: true,
						cwd: 'tmp/asset_templates',
						dot: true,
						src: ['**'],
						dest: '<%= BUILD_PATH %>'
					}],
					templates: [{
						expand: true,
						cwd: 'src/templates',
						dot: true,
						src: ['**'],
						dest: '<%= BUILD_PATH %>'
					}, {
						expand: true,
						cwd: 'tmp/templates',
						dot: true,
						src: ['**'],
						dest: '<%= BUILD_PATH %>'
					}]
				}
			},
			less: {
				compile: {
					options: {
						compress: true
					},
					files: {
						'<%= AT_CSS_PATH %>': 'src/less/_desktop.less'
					}
				},
				debug: {
					files: {
						'<%= AT_CSS_PATH %>': 'src/less/_desktop.less'
					}
				}
			},
			typescript: {
				compile: {
					files: {
						'<%= TEMP_JS_PATH %>': 'src/ap/Main.ts'
					}
				}
			},
			sas: {
				update: {}
			},
			shell: {
				update: {
					command: ['bower prune', 'bower update', 'bower install'].join('&&')
				}
			},
			uglify: {
				compile: {
					files: {
						'<%= TEMP_JS_MIN_PATH %>': ['<%= TEMP_JS_PATH %>']
					}
				}
			}
		};
		
		return config;
	})());
	
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-kapocs');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-sas');
	grunt.loadNpmTasks('grunt-typescript');
	
	grunt.registerTask('update', ['shell:update', 'sas:update']);
	grunt.registerTask('compile', ['clean:compile', 'copy:compile', 'typescript:compile', 'uglify:compile', 'concat', 'less:compile', 'kapocs:compile']);
	grunt.registerTask('debug', ['clean:compile', 'copy:compile', 'typescript:compile', 'copy:debug', 'concat', 'less:debug', 'kapocs:compile']);
	grunt.registerTask('default', ['compile']);
};