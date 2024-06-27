const path = require("path");

module.exports = {
	webpack: {
		alias: {
			"@": path.resolve(__dirname, "frontend"),
		},
	},
	paths: function (paths, _) {
		paths.appSrc = path.resolve(__dirname, "frontend/src");
		paths.appIndexJs = path.resolve(__dirname, "frontend/src/index.tsx");
		paths.appPublic = path.resolve(__dirname, "frontend/public");
		paths.appHtml = path.resolve(__dirname, "frontend/public/index.html");
		return paths;
	},
	babel: {
		plugins: ["@babel/plugin-syntax-import-assertions"],
	},
};
