'use strict';

var env = require('./env.js');

var webpack = {
    dev: env.dev,
    client: {
        entry: () => {
            return {
                main: `${env.src}/client`
            };
        },
        output: () => {
            return {
                path: `${env.dest}/client`,
                filename: '[hash]/[name].js',
                chunkFilename: '[hash]/[name].[id].js',
                publicPath: 'client/'
            };
        }
    },
    server: {
        entry: () => {
            return {
                server: `${env.src}/server`
            };
        },
        output: () => {
            return {
                path: `${env.dest}/server`,
                filename: '[name].js',
                chunkFilename: '[hash]/[name].[id].js',
                publicPath: 'client/',
                libraryTarget: 'commonjs2'
            };
        }
    },
    serviceworker: {
        entry: () => {
            return {
                'service-worker': `${env.src}/service-worker`
            };
        },
        output: () => {
            return {
                path: env.dest,
                filename: '[name].js',
                chunkFilename: '[name].[id].[hash].js'
            };
        }
    }
};

module.exports = webpack;
//# sourceMappingURL=webpack.js.map
