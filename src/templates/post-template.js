import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

export default function Template({
  data // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  const { title, city, state, units, type, tags } = frontmatter

  return (
    <Layout>
      <div className="blog-post-container">
        <div className="blog-post">
          <div className="pb0-ns relative z-1 h5">
            <div className="bg-blue absolute cover h-100 w-100 z-5" />
            <h1 className="project-header mw8 center mv0 z-5 relative white tc">
              {title}
            </h1>
          </div>
          <div className="container fw5 flex justify-between center project-info">
            <div>
              <ul className="black f4 pl0">
                <li>{'Location: ' + city + ', ' + state}</li>
                <li>{'Project Type: ' + tags + ' (' + type + ')'}</li>
                <li>{'Number of Units: ' + units}</li>
              </ul>
            </div>
            <div className="map pa2">
              <p className="f3">Map showing location will go here!</p>
            </div>
          </div>
        </div>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </Layout>
  )
}

export const projectQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { id: { eq: $path } }) {
      html
      frontmatter {
        title
        id
        city
        state
        units
        type
        tags
      }
    }
  }
`
