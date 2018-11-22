const path = require('path');
const amdLoader = require('./node_modules/monaco-editor/min/vs/loader.js');
const amdRequire = amdLoader.require;
const Split = require('split.js');
const syntaxOGL = require('./src/ogl/syntaxOGL');
const PerfectScrollbar = require('perfect-scrollbar');

const ps = new PerfectScrollbar('#editor');

//const amdDefine = amdLoader.require.define;

function uriFromPath(_path) {
    var pathName = path.resolve(_path).replace(/\\/g, '/');
    if (pathName.length > 0 && pathName.charAt(0) !== '/') {
        pathName = '/' + pathName;
    }
    return encodeURI('file://' + pathName);
}

amdRequire.config({
    baseUrl: uriFromPath(path.join(__dirname, './node_modules/monaco-editor/min'))
});

// workaround monaco-css not understanding the environment
self.module = undefined;


amdRequire(['vs/editor/editor.main'], function () {

    monaco.languages.register({
        id: 'ogl'
    });

    monaco.languages.setMonarchTokensProvider('ogl', syntaxOGL);

    var editor = monaco.editor.create(document.getElementById('editor'), {
        value: [
            'function x() {',
            '\tconsole.log("Hello world!");',
            '}'
        ].join('\n'),
        language: 'ogl',
        theme: 'vs-dark'
    });
});


Split(['#panel-editor', '#panel-view'], {
    gutterSize: 8,
    cursor: 'col-resize'
});