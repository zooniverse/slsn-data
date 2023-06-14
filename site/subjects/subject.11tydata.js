const slugify = require('slugify');

function subjectTitle(data) {
  return `Subject ${data.subject.id}`;
}

function subjectClassifications({ subject, classifications }) {
  return classifications.filter(c => c.subjectID == subject.id)
}

function ogImage({ subject }) {
  const [lightCurve] = subject.locations
  return lightCurve['image/jpeg']
}

function description({ subject, classifications }) {
  const annotations = subjectClassifications({ subject, classifications }).map(c => {
    return c.annotations.map(annotation => `${annotation.task}: ${annotation.value}`).join(' ')
  })
  return `
    ZTF ID: ${subject.metadata.objectId}
    ${annotations.join('\n')}
  `
}
module.exports = {
  eleventyComputed: {
    title: subjectTitle,
    subjectClassifications,
    description,
    ogImage
  }
}