const purgecss = require("@fullhuman/postcss-purgecss")({
  // Specify the paths to all of the template files in your project
  content: ["./src/**/*.html", "./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],

  // This is the function used to extract class names from your templates
  defaultExtractor: (content) => {
    // Capture as liberally as possible, including things like `h-(screen-1.5)`
    const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];

    // Capture classes within other delimiters like .block(class="w-1/2") in Pug
    const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];

    // Capture variables with ClassName in name
    const somethingClassName = content.match(/[ClassName ?= ?"'`\s.()]*[^"'`\s.():]/g) || [];
    const somethingClx = content.match(/[Clx ?= ?"'`\s.()]*[^"'`\s.():]/g) || [];

    return [...broadMatches, ...innerMatches, ...somethingClassName, ...somethingClx];
  }
});

module.exports = {
  plugins: [
    require("postcss-import"),
    require("tailwindcss"),
    require("postcss-nested"),
    require("autoprefixer"),
    ...(process.env.NODE_ENV === "production"
      ? [
          // purgecss,
          require("cssnano")({
            preset: "default"
          })
        ]
      : [])
  ]
};
