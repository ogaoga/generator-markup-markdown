/* jshint mocha: true */
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('Generator', function () {

    var generator;
    var baseFiles = [
        'package.json',
        'bower.json',
        'README.md',
        '.gitignore',
        '.gitattributes',
        '.editorconfig',
        '.npmrc',
        '.bowerrc',
        'Gruntfile.js',
        'grunt/aliases.js',
        'grunt/browserSync.js',
        'grunt/clean.js',
        'grunt/copy.js',
        'grunt/imagemin.js',
        'grunt/newer.js',
        'grunt/usemin.js',
        'grunt/useminPrepare.js',
        'grunt/watch.js',
        'grunt/wiredep.js',
        'app/index.html',
        'app/css/',
        'app/js/',
        'app/img/'
    ];
    var optionFiles = [
        '.csslintrc',
        '.jshintrc',
        '.jscsrc',
        '.ftppass',
        '.yo-rc.json',
        'grunt/autoprefixer.js',
        'grunt/buildcontrol.js',
        'grunt/coffee.js',
        'grunt/connect.js',
        'grunt/csslint.js',
        'grunt/ftp-deploy.js',
        'grunt/htmlmin.js',
        'grunt/jade.js',
        'grunt/jasmine.js',
        'grunt/jscs.js',
        'grunt/jshint.js',
        'grunt/less.js',
        'grunt/mocha.js',
        'grunt/modernizr.js',
        'grunt/rev.js',
        'grunt/sass.js',
        'grunt/sprite.js',
        'grunt/stylus.js',
        'grunt/validation.js',
        'grunt/webfont.js',
        'app/index.jade',
        'app/_sass/',
        'app/_less/',
        'app/_stylus/',
        'app/_coffee/',
        'app/inc/',
        'app/img/_sprites/',
        'app/img/_glyphs/'
    ];
    var baseFileContents = [
        ['package.json', /"name": "temp"/],
        ['bower.json', /"name": "temp"/],
        ['README.md', /Temp/],
        ['.editorconfig', /\[\*\.js\]/]
    ];
    var optionFileContents = [
        ['package.json', /"browsersync-ssi"/],
        ['package.json', /"grunt-autoprefixer"/],
        ['package.json', /"grunt-build-control"/],
        ['package.json', /"grunt-contrib-coffee"/],
        ['package.json', /"grunt-contrib-connect"/],
        ['package.json', /"grunt-contrib-csslint"/],
        ['package.json', /"grunt-contrib-cssmin"/],
        ['package.json', /"grunt-contrib-htmlmin"/],
        ['package.json', /"grunt-contrib-jade"/],
        ['package.json', /"grunt-contrib-jasmine"/],
        ['package.json', /"grunt-contrib-jshint"/],
        ['package.json', /"grunt-contrib-less"/],
        ['package.json', /"grunt-contrib-sass"/],
        ['package.json', /"grunt-contrib-stylus"/],
        ['package.json', /"grunt-contrib-uglify"/],
        ['package.json', /"grunt-ftp-deploy"/],
        ['package.json', /"grunt-html-validation"/],
        ['package.json', /"grunt-jscs"/],
        ['package.json', /"grunt-mocha"/],
        ['package.json', /"grunt-modernizr"/],
        ['package.json', /"grunt-rev"/],
        ['package.json', /"grunt-sass"/],
        ['package.json', /"grunt-spritesmith"/],
        ['package.json', /"grunt-webfont"/],
        ['package.json', /"imagemin-svgo"/],
        ['bower.json', /"modernizr"/],
        ['.gitignore', /\.sass-cache/],
        ['.gitignore', /validation-status\.json/],
        ['.gitignore', /validation-report\.json/],
        ['.gitignore', /\.ftppass/],
        ['grunt/aliases.js', /'(.*:)?autoprefixer(:.*)?'/],
        ['grunt/aliases.js', /'(.*:)?coffee(:.*)?'/],
        ['grunt/aliases.js', /'(.*:)?connect(:.*)?'/],
        ['grunt/aliases.js', /'(.*:)?csslint(:.*)?'/],
        ['grunt/aliases.js', /'(.*:)?htmlmin(:.*)?'/],
        ['grunt/aliases.js', /'(.*:)?jade(:.*)?'/],
        ['grunt/aliases.js', /'(.*:)?jasmine(:.*)?'/],
        ['grunt/aliases.js', /'(.*:)?jscs(:.*)?'/],
        ['grunt/aliases.js', /'(.*:)?jshint(:.*)?'/],
        ['grunt/aliases.js', /'(.*:)?less(:.*)?'/],
        ['grunt/aliases.js', /'(.*:)?mocha(:.*)?'/],
        ['grunt/aliases.js', /'(.*:)?modernizr(:.*)?'/],
        ['grunt/aliases.js', /'(.*:)?rev(:.*)?'/],
        ['grunt/aliases.js', /'(.*:)?sass(:.*)?'/],
        ['grunt/aliases.js', /'(.*:)?sprite(:.*)?'/],
        ['grunt/aliases.js', /'(.*:)?stylus(:.*)?'/],
        ['grunt/aliases.js', /'(.*:)?validation(:.*)?'/],
        ['grunt/aliases.js', /'(.*:)?webfont(:.*)?'/],
        ['grunt/watch.js', /'(.*:)?autoprefixer(:.*)?'/],
        ['grunt/watch.js', /'(.*:)?csslint(:.*)?'/],
        ['grunt/watch.js', /'(.*:)?coffee(:.*)?'/],
        ['grunt/watch.js', /'(.*:)?jade(:.*)?'/],
        ['grunt/watch.js', /'(.*:)?jscs(:.*)?'/],
        ['grunt/watch.js', /'(.*:)?jshint(:.*)?'/],
        ['grunt/watch.js', /'(.*:)?less(:.*)?'/],
        ['grunt/watch.js', /'(.*:)?sass(:.*)?'/],
        ['grunt/watch.js', /'(.*:)?sprites(:.*)?'/],
        ['grunt/watch.js', /'(.*:)?ssi(:.*)?'/],
        ['grunt/watch.js', /'(.*:)?stylus(:.*)?'/],
        ['grunt/watch.js', /'(.*:)?test(:.*)?'/],
        ['grunt/watch.js', /'(.*:)?validation(:.*)?'/],
        ['grunt/watch.js', /'(.*:)?webfont(:.*)?'/],
        ['grunt/browserSync.js', /ssi/],
        ['app/index.html', /sprites\.css/],
        ['app/index.html', /glyphs\.css/],
        ['app/index.html', /modernizr\.js/]
    ];

    beforeEach(function () {
        generator = helpers
            .run(path.join(__dirname, '../app'))
            .inDir(path.join(__dirname, 'temp'))
            .withGenerators([
                [helpers.createDummyGenerator(), 'mocha:app'],
                [helpers.createDummyGenerator(), 'jasmine:app']
            ])
            .withOptions({
                'skip-install': true,
                'skip-welcome-message': true,
                'skip-install-message': true
            });
    });

    it('creates expected package files', function (done) {
        generator
            .withPrompt({
                name: 'Test Project'
            })
            .on('end', function () {
                assert.fileContent([
                    ['package.json', /"name": "test-project"/],
                    ['bower.json', /"name": "test-project"/],
                    ['README.md', /Test Project/]
                ]);
                done();
            });
    });

    it('creates expected files in minimum preset', function (done) {
        generator
            .withPrompt({
                configType: 'minimum'
            })
            .on('end', function () {
                assert.file(baseFiles);
                assert.noFile(optionFiles);
                assert.fileContent(baseFileContents);
                assert.noFileContent(optionFileContents);
                done();
            });
    });

    it('creates expected files in standard preset', function (done) {
        generator
            .withPrompt({
            })
            .on('end', function () {
                assert.file(baseFiles.concat([
                    '.csslintrc',
                    '.jshintrc',
                    '.jscsrc',
                    'grunt/autoprefixer.js',
                    'grunt/csslint.js',
                    'grunt/htmlmin.js',
                    'grunt/jscs.js',
                    'grunt/jshint.js',
                    'grunt/rev.js',
                    'grunt/sprite.js',
                    'grunt/validation.js',
                    'app/img/_sprites/'
                ]));
                done();
            });
    });

    it('creates expected files with "jade" option', function (done) {
        generator
            .withPrompt({
                configType: 'custom',
                markup: 'jade'
            })
            .on('end', function () {
                assert.file([
                    'grunt/jade.js',
                    'app/index.jade'
                ]);
                assert.noFile([
                    'app/index.html'
                ]);
                assert.fileContent([
                    ['package.json', /"grunt-contrib-jade"/],
                    ['grunt/aliases.js', /'(.*:)?jade(:.*)?'/],
                    ['grunt/watch.js', /'(.*:)?jade(:.*)?'/]
                ]);
                assert.noFileContent([
                    ['app/index.jade', /sprites\.css/],
                    ['app/index.jade', /glyphs\.css/],
                    ['app/index.jade', /modernizr\.js/]
                ]);
                done();
            });
    });

    it('creates expected files with "jade" + assets option', function (done) {
        generator
            .withPrompt({
                configType: 'custom',
                markup: 'jade',
                utilities: ['sprite', 'webfont'],
                libraries: ['modernizr']
            })
            .on('end', function () {
                assert.fileContent([
                    ['app/index.jade', /sprites\.css/],
                    ['app/index.jade', /glyphs\.css/],
                    ['app/index.jade', /modernizr\.js/]
                ]);
                done();
            });
    });

    it('creates expected files with "sass" option', function (done) {
        generator
            .withPrompt({
                configType: 'custom',
                style: 'sass'
            })
            .on('end', function () {
                assert.file([
                    'grunt/sass.js',
                    'app/_sass/'
                ]);
                assert.noFile([
                    'app/css/'
                ]);
                assert.fileContent([
                    ['package.json', /"grunt-contrib-sass"/],
                    ['.gitignore', /\.sass-cache/],
                    ['grunt/aliases.js', /'(.*:)?sass(:.*)?'/],
                    ['grunt/watch.js', /'(.*:)?sass(:.*)?'/]
                ]);
                assert.noFileContent([
                    ['package.json', /"grunt-sass"/]
                ]);
                done();
            });
    });

    it('creates expected files with "libsass" option', function (done) {
        generator
            .withPrompt({
                configType: 'custom',
                style: 'libsass'
            })
            .on('end', function () {
                assert.file([
                    'grunt/sass.js',
                    'app/_sass/'
                ]);
                assert.noFile([
                    'app/css/'
                ]);
                assert.fileContent([
                    ['package.json', /"grunt-sass"/],
                    ['grunt/aliases.js', /'(.*:)?sass(:.*)?'/],
                    ['grunt/watch.js', /'(.*:)?sass(:.*)?'/]
                ]);
                assert.noFileContent([
                    ['package.json', /"grunt-contrib-sass"/],
                    ['.gitignore', /\.sass-cache/]
                ]);
                done();
            });
    });

    it('creates expected files with "less" option', function (done) {
        generator
            .withPrompt({
                configType: 'custom',
                style: 'less'
            })
            .on('end', function () {
                assert.file([
                    'grunt/less.js',
                    'app/_less/'
                ]);
                assert.noFile([
                    'app/css/'
                ]);
                assert.fileContent([
                    ['package.json', /"grunt-contrib-less"/],
                    ['grunt/aliases.js', /'(.*:)?less(:.*)?'/],
                    ['grunt/watch.js', /'(.*:)?less(:.*)?'/]
                ]);
                done();
            });
    });

    it('creates expected files with "stylus" option', function (done) {
        generator
            .withPrompt({
                configType: 'custom',
                style: 'stylus'
            })
            .on('end', function () {
                assert.file([
                    'grunt/stylus.js',
                    'app/_stylus/'
                ]);
                assert.noFile([
                    'app/css/'
                ]);
                assert.fileContent([
                    ['package.json', /"grunt-contrib-stylus"/],
                    ['grunt/aliases.js', /'(.*:)?stylus(:.*)?'/],
                    ['grunt/watch.js', /'(.*:)?stylus(:.*)?'/]
                ]);
                done();
            });
    });

    it('creates expected files with "coffee" option', function (done) {
        generator
            .withPrompt({
                configType: 'custom',
                script: 'coffee'
            })
            .on('end', function () {
                assert.file([
                    'grunt/coffee.js',
                    'app/_coffee/'
                ]);
                assert.noFile([
                    'app/js/'
                ]);
                assert.fileContent([
                    ['package.json', /"grunt-contrib-coffee"/],
                    ['grunt/aliases.js', /'(.*:)?coffee(:.*)?'/],
                    ['grunt/watch.js', /'(.*:)?coffee(:.*)?'/],
                ]);
                assert.noFileContent([
                    ['.editorconfig', /\[\*\.js\]/]
                ]);
                done();
            });
    });

    it('creates expected files with "autoprefixer" option', function (done) {
        generator
            .withPrompt({
                configType: 'custom',
                utilities: ['autoprefixer']
            })
            .on('end', function () {
                assert.file([
                    'grunt/autoprefixer.js'
                ]);
                assert.fileContent([
                    ['package.json', /"grunt-autoprefixer"/],
                    ['grunt/aliases.js', /'(.*:)?autoprefixer(:.*)?'/],
                    ['grunt/watch.js', /'(.*:)?autoprefixer(:.*)?'/]
                ]);
                done();
            });
    });

    it('creates expected files with "sprite" option', function (done) {
        generator
            .withPrompt({
                configType: 'custom',
                utilities: ['sprite']
            })
            .on('end', function () {
                assert.file([
                    'grunt/sprite.js',
                    'app/img/_sprites/'
                ]);
                assert.fileContent([
                    ['package.json', /"grunt-spritesmith"/],
                    ['grunt/aliases.js', /'(.*:)?sprite(:.*)?'/],
                    ['grunt/watch.js', /'(.*:)?sprite(:.*)?'/],
                    ['app/index.html', /sprites\.css/]
                ]);
                done();
            });
    });

    it('creates expected files with "webfont" option', function (done) {
        generator
            .withPrompt({
                configType: 'custom',
                utilities: ['webfont']
            })
            .on('end', function () {
                assert.file([
                    'grunt/webfont.js',
                    'app/img/_glyphs/'
                ]);
                assert.fileContent([
                    ['package.json', /"grunt-webfont"/],
                    ['grunt/aliases.js', /'(.*:)?webfont(:.*)?'/],
                    ['grunt/watch.js', /'(.*:)?webfont(:.*)?'/],
                    ['app/index.html', /glyphs\.css/]
                ]);
                done();
            });
    });

    it('creates expected files with "validation" option', function (done) {
        generator
            .withPrompt({
                configType: 'custom',
                testing: ['validation']
            })
            .on('end', function () {
                assert.file([
                    'grunt/validation.js'
                ]);
                assert.fileContent([
                    ['package.json', /"grunt-html-validation"/],
                    ['.gitignore', /validation-status\.json/],
                    ['.gitignore', /validation-report\.json/],
                    ['grunt/aliases.js', /'(.*:)?validation(:.*)?'/],
                    ['grunt/watch.js', /'(.*:)?validation(:.*)?'/]
                ]);
                done();
            });
    });

    it('creates expected files with "csslint" option', function (done) {
        generator
            .withPrompt({
                configType: 'custom',
                testing: ['csslint']
            })
            .on('end', function () {
                assert.file([
                    'grunt/csslint.js',
                    '.csslintrc'
                ]);
                assert.fileContent([
                    ['package.json', /"grunt-contrib-csslint"/],
                    ['grunt/aliases.js', /'(.*:)?csslint(:.*)?'/],
                    ['grunt/watch.js', /'(.*:)?csslint(:.*)?'/]
                ]);
                done();
            });
    });

    it('creates expected files with "jshint" option', function (done) {
        generator
            .withPrompt({
                configType: 'custom',
                testing: ['jshint']
            })
            .on('end', function () {
                assert.file([
                    'grunt/jshint.js',
                    '.jshintrc'
                ]);
                assert.fileContent([
                    ['package.json', /"grunt-contrib-jshint"/],
                    ['grunt/aliases.js', /'(.*:)?jshint(:.*)?'/],
                    ['grunt/watch.js', /'(.*:)?jshint(:.*)?'/]
                ]);
                done();
            });
    });

    it('creates expected files with "jscs" option', function (done) {
        generator
            .withPrompt({
                configType: 'custom',
                testing: ['jscs']
            })
            .on('end', function () {
                assert.file([
                    'grunt/jscs.js',
                    '.jscsrc'
                ]);
                assert.fileContent([
                    ['package.json', /"grunt-jscs"/],
                    ['grunt/aliases.js', /'(.*:)?jscs(:.*)?'/],
                    ['grunt/watch.js', /'(.*:)?jscs(:.*)?'/]
                ]);
                done();
            });
    });

    it('creates expected files with "mocha" option', function (done) {
        generator
            .withPrompt({
                configType: 'custom',
                testing: ['mocha']
            })
            .on('end', function () {
                assert.file([
                    'grunt/mocha.js',
                    'grunt/connect.js'
                ]);
                assert.fileContent([
                    ['package.json', /"grunt-mocha"/],
                    ['package.json', /"grunt-contrib-connect"/],
                    ['grunt/aliases.js', /'(.*:)?mocha(:.*)?'/],
                    ['grunt/aliases.js', /'(.*:)?connect(:.*)?'/],
                    ['grunt/watch.js', /'(.*:)?test(:.*)?'/]
                ]);
                done();
            });
    });

    it('creates expected files with "jasmine" option', function (done) {
        generator
            .withPrompt({
                configType: 'custom',
                testing: ['jasmine']
            })
            .on('end', function () {
                assert.file([
                    'grunt/jasmine.js'
                ]);
                assert.fileContent([
                    ['package.json', /"grunt-contrib-jasmine"/],
                    ['grunt/aliases.js', /'(.*:)?jasmine(:.*)?'/],
                    ['grunt/watch.js', /'(.*:)?test(:.*)?'/]
                ]);
                done();
            });
    });

    it('creates expected files with "ssi" option', function (done) {
        generator
            .withPrompt({
                configType: 'custom',
                server: ['ssi']
            })
            .on('end', function () {
                assert.file([
                    'app/inc/'
                ]);
                assert.fileContent([
                    ['package.json', /"browsersync-ssi"/],
                    ['grunt/browserSync.js', /ssi/]
                ]);
                done();
            });
    });

    it('creates expected files with "modernizr" option', function (done) {
        generator
            .withPrompt({
                configType: 'custom',
                libraries: ['modernizr']
            })
            .on('end', function () {
                assert.file([
                    'grunt/modernizr.js'
                ]);
                assert.fileContent([
                    ['package.json', /"grunt-modernizr"/],
                    ['bower.json', /"modernizr"/],
                    ['grunt/aliases.js', /'(.*:)?modernizr(:.*)?'/],
                    ['app/index.html', /modernizr\.js/]
                ]);
                done();
            });
    });

    it('creates expected files with "htmlmin" option', function (done) {
        generator
            .withPrompt({
                configType: 'custom',
                optimization: ['htmlmin']
            })
            .on('end', function () {
                assert.file([
                    'grunt/htmlmin.js'
                ]);
                assert.fileContent([
                    ['package.json', /"grunt-contrib-htmlmin"/],
                    ['grunt/aliases.js', /'(.*:)?htmlmin(:.*)?'/]
                ]);
                done();
            });
    });

    it('creates expected files with "cssmin" option', function (done) {
        generator
            .withPrompt({
                configType: 'custom',
                optimization: ['cssmin']
            })
            .on('end', function () {
                assert.fileContent([
                    ['package.json', /"grunt-contrib-cssmin"/],
                    ['grunt/aliases.js', /'(.*:)?cssmin(:.*)?'/]
                ]);
                done();
            });
    });

    it('creates expected files with "uglify" option', function (done) {
        generator
            .withPrompt({
                configType: 'custom',
                optimization: ['uglify']
            })
            .on('end', function () {
                assert.fileContent([
                    ['package.json', /"grunt-contrib-uglify"/],
                    ['grunt/aliases.js', /'(.*:)?uglify(:.*)?'/]
                ]);
                done();
            });
    });

    it('creates expected files with "svgo" option', function (done) {
        generator
            .withPrompt({
                configType: 'custom',
                optimization: ['svgo']
            })
            .on('end', function () {
                assert.fileContent([
                    ['package.json', /"imagemin-svgo"/],
                    ['grunt/imagemin.js', /svg/]
                ]);
                done();
            });
    });

    it('creates expected files with "rev" option', function (done) {
        generator
            .withPrompt({
                configType: 'custom',
                optimization: ['rev']
            })
            .on('end', function () {
                assert.file([
                    'grunt/rev.js'
                ]);
                assert.fileContent([
                    ['package.json', /"grunt-rev"/],
                    ['grunt/aliases.js', /'(.*:)?rev(:.*)?'/]
                ]);
                done();
            });
    });

    it('creates expected files with "buildcontrol" option', function (done) {
        generator
            .withPrompt({
                configType: 'custom',
                distribution: ['buildcontrol']
            })
            .on('end', function () {
                assert.file([
                    'grunt/buildcontrol.js'
                ]);
                assert.fileContent([
                    ['package.json', /"grunt-build-control"/]
                ]);
                done();
            });
    });

    it('creates expected files with "ftp" option', function (done) {
        generator
            .withPrompt({
                configType: 'custom',
                distribution: ['ftp']
            })
            .on('end', function () {
                assert.file([
                    'grunt/ftp-deploy.js',
                    '.ftppass'
                ]);
                assert.fileContent([
                    ['package.json', /"grunt-ftp-deploy"/],
                    ['.gitignore', /\.ftppass/]
                ]);
                done();
            });
    });

    it('creates expected files with "store" option', function (done) {
        generator
            .withPrompt({
                configType: 'custom',
                store: true
            })
            .on('end', function () {
                assert.file([
                    '.yo-rc.json'
                ]);
                done();
            });
    });

});
