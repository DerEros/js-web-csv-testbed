const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/helloworld/helloworld.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist/helloworld")
    },
    module: {
        rules: [
            {
                test: /\.sass$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("style.css")
    ]
};