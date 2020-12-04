module.exports = {
  plugins: ["@babel/plugin-proposal-nullish-coalescing-operator"],
  presets: [["@babel/preset-env", { targets: { node: "current" } }], "@babel/preset-typescript"]
};
