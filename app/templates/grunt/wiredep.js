// Inject Bower components into source code
//
// grunt-wiredep: <https://github.com/stephenplusplus/grunt-wiredep>
// wiredep: <https://github.com/taptapship/wiredep>

'use strict';

module.exports = {

  markups: {<% if (cfg.html) { %>
    src: ['<%%= path.template %>/**/*.html']<% } %><% if (cfg.jade) { %>
    src: ['<%%= path.template %>/**/*.jade']<% } %><% if (cfg.modernizr) { %>,
    exclude: ['bower_components/modernizr/modernizr.js']<% } %>,
    // Force absolute URL
    // "../bower_components/xxxx" -> "/bower_components/xxxx"
    ignorePath: /(\.\.\/)*\.\.(?=\/)/
  }<% if (cfg.sass || cfg.libsass || cfg.less || cfg.stylus) { %>,
  styles: {<% if (cfg.sass || cfg.libsass) { %>
    src: ['<%%= path.styles %>/**/*.{scss,sass}']<% } %><% if (cfg.less) { %>
    src: ['<%%= path.styles %>/**/*.less']<% } %><% if (cfg.stylus) { %>
    src: ['<%%= path.styles %>/**/*.styl']<% } %>,
    // Import from bower_components directory
    // "../bower_components/xxxx" -> "xxxx"
    ignorePath: /(\.\.\/)*bower_components\//
  }<% } %>

};
