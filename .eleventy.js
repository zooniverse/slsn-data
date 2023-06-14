const { parse } = require("csv-parse/sync");

module.exports = function (eleventyConfig) {
  eleventyConfig.addLayoutAlias("default", "layouts/default.njk");

  eleventyConfig.addShortcode("PageMetadata", require('./components/PageMetadata'));

  eleventyConfig.addDataExtension("csv", (contents) => {
      const records = parse(contents, {
        columns: true,
        skip_empty_lines: true,
      })
      const [record] = records
      if (record.reducer) {
        return records
      }
      const classifications = records.map(({ workflow_id, metadata, annotations, subject_data }) => {
        const [ subjectArray ] = Object.entries(JSON.parse(subject_data))
        const [ subjectID, subjectMetadata ] = subjectArray
        return {
          metadata: JSON.parse(metadata),
          annotations: JSON.parse(annotations),
          subjectID,
          subjectMetadata,
          workflowID: workflow_id
        }
      })
      .filter(classification => classification.workflowID === '13193')
      console.log('read', classifications.length, 'classifications')
      return classifications
    });

  return {
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
    ],

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",

    // These are all optional, defaults are shown:
    dir: {
      input: "./site",
      includes: "_includes",
      data: "_data",
      output: "dist"
    }
  };
}
