import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import ContactMap from '../components/SingleLocationMap'

export default function Template({
  data // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  const { title, city, state, units, type, tags, position } = frontmatter

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
          <div className="container fw5 flex justify-between center">
            <div>
              <div className="black f4 pl0">
                <div>
                  <span className="b">Location: </span>
                  {city + ', ' + state}
                </div>
                <div>
                  <span className="b">Project Type: </span>
                  {tags + ' (' + type + ')'}
                </div>
                <div>
                  <span className="b">Number of Units: </span>
                  {units}
                </div>
              </div>
              <div
                className="blog-post-content"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
            <div className="map pa2">
              <ContactMap
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBsuCjHZUuNmjtfjwxYsFGj8aouf18e9aU"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div id="contact-map" className="w-100" />}
                mapElement={<div style={{ height: `100%` }} />}
                lat={position.lat}
                lng={position.lng}
              />
            </div>
          </div>
        </div>
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
        position {
          lat
          lng
        }
      }
    }
  }
`
