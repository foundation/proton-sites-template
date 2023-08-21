const esbuild            = require('esbuild');
const { copy }           = require('esbuild-plugin-copy');
const { globPlugin }     = require('esbuild-plugin-glob');
const { sassPlugin }     = require("esbuild-sass-plugin");
const { createImporter } = require("sass-extended-importer");

esbuild.build({
    entryPoints : [
        "src/js/*.js",
        "src/styles/[a-zA-Z]*.scss",
    ],
    bundle    : true,
    minify    : false,
    // sourcemap : true,
    // metafile    : true,
    // watch       : true,
    // incremental : true,
    outdir      : 'dist/assets/',
    external    : ["jquery", "what-input"],
    plugins     : [
        globPlugin(),
        // Sass includes
        sassPlugin({
            loadPaths: [
                "node_modules/foundation-sites/scss/",
                "node_modules/motion-ui/src/",
            ],
            importer: createImporter(),
        }),
        // Copy in the static external libraries
        // https://github.com/LinbuduLab/esbuild-plugins/issues/105
        copy({ assets: {
            from : "node_modules/jquery/dist/jquery.min.js",
            to   : "js/vendor"
        }}),
        copy({ assets: {
            from : "node_modules/what-input/dist/what-input.min.js",
            to   : "js/vendor"
        }}),
    ],
});
