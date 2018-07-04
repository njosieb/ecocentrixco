const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const pages = result.data.allMarkdownRemark.edges

    pages.forEach(edge => {
      const id = edge.node.id
      createPage({
        path: edge.node.fields.slug,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id
        },
      })
    })
  })
}

const adjustImagePath = nodePath => image => {
  if (_.isString(image)) {
    if (image.indexOf('/img') === 0) {
      const nextImage = path.relative(
        path.dirname(nodePath),
        path.join(
          __dirname,
          'static/img',
          image.substr('/img'.length)
        )
      )
      console.log('Adjusted image path', nextImage)
      return nextImage
    }
  }
  return image
}

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })

    // This is where we convert NetlifyCMS img path strings into ImageSharp objects
    const { frontmatter } = node
    if (frontmatter) {
      const adjust = adjustImagePath(node.fileAbsolutePath)
      const { certifications } = frontmatter
      // Image location string -> ImageSharp objects
      if (certifications) {
        node.frontmatter.certifications.forEach(cert => {
          cert.certImage = adjust(cert.certImage)
        })
      }
    }
  }
}
