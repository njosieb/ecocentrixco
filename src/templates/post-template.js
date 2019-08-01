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
        <div className="blog-post pb5">
          <div className="pb0-ns relative z-1 h5">
            <div className="bg-blue absolute cover h-100 w-100 z-5" />
            <h1 className="project-header mw8 center mv0 z-5 relative white tc">
              {title}
            </h1>
          </div>
          <div className="container fw5">
            <l className="green f3">
              <li className="pt4">{city + ', ' + state}</li>
              <li>{units + ' Units'}</li>
              <li>{type + ': ' + tags}</li>
            </l>
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
