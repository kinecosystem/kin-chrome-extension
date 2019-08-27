const merge = require('webpack-merge');

module.exports = env => {
    const base = require(env.base);
    return merge(base, {
        mode: 'production'
    });
}