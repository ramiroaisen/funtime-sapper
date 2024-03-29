'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./_commonjsHelpers.js');
require('path');
require('fs');
require('http');
require('child_process');
require('net');
require('./Deferred.js');
require('events');
var create_manifest_data = require('./create_manifest_data.js');
require('module');
require('crypto');
require('util');
require('sourcemap-codec');
require('./index.js');
require('./env.js');
require('./copy_runtime.js');
require('./fs_utils.js');
var dev = require('./dev.js');
require('html-minifier');
require('./minify_html.js');
var build = require('./build.js');
require('url');
require('stream');
require('https');
require('zlib');
var _export = require('./export.js');
require('http-link-header');

function find_page(pathname, cwd = 'src/routes') {
    const { pages } = create_manifest_data.create_manifest_data(cwd);
    for (let i = 0; i < pages.length; i += 1) {
        const page = pages[i];
        if (page.pattern.test(pathname)) {
            return page.parts[page.parts.length - 1].component.file;
        }
    }
}

exports.dev = dev.dev;
exports.build = build.build;
exports.export = _export.export;
exports.find_page = find_page;
//# sourceMappingURL=api.js.map
