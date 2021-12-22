const copy               = require('esbuild-plugin-copy');
const esbuild            = require('esbuild');
const { globPlugin }     = require('esbuild-plugin-glob');
const { sassPlugin }     = require("esbuild-sass-plugin");
const { createImporter } = require("sass-extended-importer");

esbuild.build({
    entryPoints : [
        "src/js/*.js",
        "src/styles/[a-zA-Z]*.scss",
    ],
    bundle      : true,
    minify      : false,
    // metafile    : true,
    // watch       : true,
    // incremental : true,
    outdir      : 'dist/assets/',
    external    : ["jquery", "what-input"],
    plugins     : [
        globPlugin(),
        // Sass includes
        sassPlugin({
            includePaths: [
                "node_modules/foundation-sites/scss/",
                "node_modules/motion-ui/src/",
            ],
            importer: createImporter(),
        }),
        // Copy in the static external libraries
        copy.default({assets: {
            from: [
                "node_modules/jquery/dist/jquery.min.js",
                "node_modules/what-input/dist/what-input.min.js",
            ],
            to: [ "js/vendor" ]
        }})
    ],
});
