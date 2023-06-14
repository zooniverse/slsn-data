const slugify = require('slugify');

function subjectTitle(data) {
  return `Subject ${data.subject.id}`;
}

function subjectClassifications({ subject, classifications }) {
  return classifications.filter(c => c.subjectID == subject.id)
}

module.exports = {
  eleventyComputed: {
    title: subjectTitle,
    subjectClassifications
  }
}