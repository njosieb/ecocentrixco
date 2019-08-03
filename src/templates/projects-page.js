import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Layout from '../components/Layout'
import ProjectsMap from '../components/ProjectsMap'

const tagList = [
  { label: 'All', value: 'All', href: 'all' },
  { label: 'Energy Audit', value: 'EA', href: 'energy-audit' },
  { label: 'Energy Audit Review', value: 'EAR', href: 'energy-audit-review' },
  { label: 'Energy Star', value: 'ES', href: 'energy-start' },
  {
    label: 'National Green Building Standard',
    value: 'NGBS',
    href: 'national-green-building-standard'
  },
  {
    label: 'Home Energy Rating System',
    value: 'HERS',
    href: 'home-energy-rating-system'
  }
]

export class ProjectsPageTemplate extends Component {
  checkMapsLoaded = 0
  state = {
    activeTag: 'All',
    filteredProjects: [],
    markers: {}
  }

  componentDidMount() {
    const activeTag = tagList.filter(
      tag => tag.href === window.location.hash.replace('#', '')
    )[0]

    this.filterProjects(activeTag ? activeTag.value : 'All')
  }

  filterProjects = function(tag) {
    const { projects } = this.props
    const filteredProjects =
      tag === 'All' ? projects : projects.filter(proj => proj.type === tag)

    const foundTag = tagList.filter(item => item.value === tag)[0]
    window.location.hash = tag === 'All' ? '' : `#${foundTag.href}`

    this.setState({
      activeTag: tag,
      markers: projects.reduce(
        (map, marker) => ({ ...map, [marker.id]: false }),
        {}
      ),
      filteredProjects
    })
  }

  toggleMarkerWindow = markerId => {
    const { projects } = this.props

    this.setState(prevState => ({
      ...prevState,
      markers: projects.reduce((map, project) => ({
        ...map,
        [project.id]:
          project.id === markerId ? !prevState.markers[markerId] : false
      }))
    }))
  }

  render() {
    const { title, projectsBackground } = this.props
    const { activeTag, filteredProjects } = this.state

    const backgroundImageStyle = {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%'
    }

    return (
      <div className="projects-page">
        <div className="pb0-ns z-3 h5 relative">
          <div className="bg-grey-color-80 absolute cover h-100 w-100 z-2" />
          <Img
            sizes={projectsBackground.childImageSharp.sizes}
            style={backgroundImageStyle}
          />
          <h1 className="mw8 pl5 f2 f-5-ns center white mv0 lh-copy z-3 relative">
            {title}
          </h1>
        </div>
        <div className="portfoilo-body ">
          <div className="filtering-tags mw8 center flex flex-wrap justify-center mv3-ns mv2 tc items-center pv4-ns pv3">
            {tagList.map(tag => (
              <span
                key={tag.value}
                onClick={() => this.filterProjects(tag.value)}
                className={`${
                  activeTag === tag.value ? 'active-tag ' : ''
                }project-filter clickable mh3-ns mh1 pointer f4-ns f5 blue fw7 br-pill bg-white ba ph3 pv2 b--gold mb3`}
              >
                {tag.label}
              </span>
            ))}
          </div>
          <div className="projects-area flex-ns vh-50-ns overflow-hidden-ns pb5 pl5 pr5">
            <ProjectsMap
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBsuCjHZUuNmjtfjwxYsFGj8aouf18e9aU"
              markers={this.state.filteredProjects}
              markerStates={this.state.markers}
              toggleMarkerWindow={this.toggleMarkerWindow}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={
                <div id="projects-map" className="h-100 w-100 flex-50" />
              }
              mapElement={<div style={{ height: `100%` }} />}
            />
            <div className="projects-container flex-50 pb4 overflow-auto h-100">
              {filteredProjects.map((project, i) => (
                <div
                  key={i}
                  className="project pointer flex items-center relative mb2 ph3 ph4-ns"
                >
                  <h3
                    className="project-title f5 f4-ns ma0 green lh-solid pr2 pr0-ns"
                    style={{ flexBasis: '50%' }}
                    onClick={() => this.toggleMarkerWindow(project.id)}
                  >
                    <span className="project-title-text underline-hover lh-copy">
                      {project.title}
                    </span>
                  </h3>
                  <div
                    className="project-location f6 f5-ns flex-auto"
                    style={{ flexBasis: '25%' }}
                  >
                    {project.city}, {project.state}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ProjectsPageTemplate.propTypes = {
  title: PropTypes.string,
  projects: PropTypes.array,
  projectsBackground: PropTypes.object
}

const ProjectsPage = ({ data }) => {
  const { markdownRemark: page, allMarkdownRemark } = data
  const projectEdges = allMarkdownRemark.edges.filter(
    edge => !!edge.node.frontmatter.id
  )

  const projects = projectEdges.map(edge => edge.node.frontmatter)

  return (
    <Layout>
      <ProjectsPageTemplate
        title={page.frontmatter.title}
        projects={projects}
        projectsBackground={page.frontmatter.projectsBackground}
      />
    </Layout>
  )
}

ProjectsPage.propTypes = {
  data: PropTypes.object,
  projectsBackground: PropTypes.object
}

export default ProjectsPage

export const ProjectsPageQuery = graphql`
  query ProjectsQuery {
    markdownRemark(frontmatter: { templateKey: { eq: "projects-page" } }) {
      frontmatter {
        title
        projectsBackground {
          childImageSharp {
            sizes(maxWidth: 1400) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
    allMarkdownRemark {
      edges {
        node {
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
    }
  }
`
