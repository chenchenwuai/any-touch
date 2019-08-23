const rollup = require('rollup');
const config = require('./rollup.build.config');
// 压缩代码
const {
    terser
} = require('rollup-plugin-terser');
const {
    input,
    plugins,
    output
} = config;


// 非压缩
output.forEach(eachOutputOptions => {
    // 压缩umd
    if ('umd' === eachOutputOptions.format) {
        plugins.push(terser());
        // eachOutputOptions.file = eachOutputOptions.file.replace('.js', '.min.js');
    }
    build(eachOutputOptions);
});

// 打包开始
async function build(outputOptions) {
    const IS_UMD = 'umd' === outputOptions.format;
    const bundle = await rollup.rollup({
        input,
        external: IS_UMD ? undefined : ['any-event'],
        plugins,
    });

    // console.log(bundle.imports); // an array of external dependencies
    // console.log(bundle.exports); // an array of names exported by the entry point
    // console.log(bundle.modules); // an array of module objects
    const {
        code,
        map
    } = await bundle.generate(outputOptions);

    await bundle.write(outputOptions);
}