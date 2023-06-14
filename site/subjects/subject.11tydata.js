const slugify = require('slugify');

function subjectTitle(data) {
  return `Subject ${data.subject.id}`;
}

function subjectClassifications({ subject, classifications }) {
  return classifications.filter(c => c.subjectID == subject.id)
}

function subjectLocations({ subject }) {
  const [lightCurve, panStamp] = subject.locations
  if (lightCurve && panStamp) {
    return [{
      alt: 'Light curve graph: brightness as a function of time in days.',
      src: lightCurve['image/jpeg']
    }, {
      alt: 'PanSTARRS cut-out image of the target area of the sky.',
      src: panStamp['image/jpeg']
    }]
  }
  return []
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
    subjectLocations,
    description,
    ogImage
  }
}