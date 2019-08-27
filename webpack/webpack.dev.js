const merge = require('webpack-merge');

module.exports = env => {
    const base = require(env.base);
    return merge(base, {
        devtool: 'inline-source-map',
        mode: 'development'
    });
}