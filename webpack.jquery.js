const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/jquery/csvloader.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist/jquery"),
        publicPath: "/dist/jquery/"
    },
    devServer: {
        publicPath: "/dist/jquery/"
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