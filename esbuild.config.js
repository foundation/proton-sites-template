const esbuild = require('esbuild');
const glob = require("tiny-glob");
const copy = require('esbuild-plugin-copy');
const { sassPlugin } = require("esbuild-sass-plugin");

(async () => {

    const files = await glob("src/{js,styles}/[a-zA-Z]*.*");
    await esbuild.build({
        entryPoints : files,
        bundle      : true,
        minify      : false,
        watch       : false,
        outdir      : 'dist/assets/',
        external    : ["jquery", "what-input"],
        plugins     : [
            // Sass includes
            sassPlugin({includePaths: [
                "node_modules/foundation-sites/scss/",
                "node_modules/motion-ui/src/",
            ]}),
            // Copy in the static external libraries
            copy.default({assets: {
                from: [
                    "node_modules/jquery/dist/jquery.min.js",
                    "node_modules/what-input/dist/what-input.min.js",
                ],
                to: [ "js" ]
            }})
        ],
    }).catch(() => process.exit(1));

})();
