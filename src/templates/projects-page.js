import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'

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
  state = {
    activeTag: 'All',
    filteredProjects: [],
    map: null,
    markers: [],
    markerCluster: null
  }

  constructor(props) {
    super(props)

    this.initMap = this.initMap.bind(this)
  }

  componentDidMount() {
    const activeTag = tagList.filter(
      tag => tag.href === window.location.hash.replace('#', '')
    )[0]
    this.setState({
      ...this.state,
      activeTag: activeTag ? activeTag.value : 'All'
    })
  }

  filterProjects = function(tag, map) {
    const mapToUse = map || this.state.map
    const { projects } = this.props
    const filteredProjects =
      tag === 'All' ? projects : projects.filter(proj => proj.type === tag)

    const foundTag = tagList.filter(item => item.value === tag)[0]
    window.location.hash = tag === 'All' ? '' : `#${foundTag.href}`

    this.state.markers.forEach(marker => marker.setMap(null))

    const markers = filteredProjects.map(project => {
      return new window.google.maps.Marker({
        position: project.position,
        map: mapToUse
      })
    })

    if (this.state.markerCluster) {
      this.state.markerCluster.clearMarkers()
    }

    const markerCluster = new window.MarkerClusterer(mapToUse, markers, {
      imagePath: `/img/m`
    })

    this.setState({
      map: mapToUse,
      activeTag: tag,
      markers,
      markerCluster,
      filteredProjects
    })
  }

  setGoogleMapOnLoad = function({ scriptTags }) {
    if (scriptTags) {
      const googleMapScript = scriptTags[0]
      googleMapScript.onload = this.initMap
    }
  }

  initMap = function() {
    const map = new window.google.maps.Map(
      document.getElementById('projects-map'),
      {
        zoom: 5,
        center: { lat: 38.628141, lng: -90.209818 },
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        draggable: true
      }
    )

    this.filterProjects(this.state.activeTag, map)
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
        <Helmet
          script={[
            {
              src:
                'https://maps.googleapis.com/maps/api/js?key=AIzaSyBsuCjHZUuNmjtfjwxYsFGj8aouf18e9aU',
              async: true,
              defer: true
            },
            { src: '/scripts/markerclusterer.js' }
          ]}
          onChangeClientState={(newState, addedTags) =>
            this.setGoogleMapOnLoad(addedTags)
          }
        />
        <div className="pb0-ns z-1 h5 relative">
          <div className="bg-grey-color-80 absolute cover h-100 w-100 z-2" />
          <Img
            sizes={projectsBackground.childImageSharp.sizes}
            style={backgroundImageStyle}
          />
          <h1 className="mw8 pl5 f2 f-5-ns center white mv0 lh-copy z-5">
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
          <div className="projects-area flex-ns vh-50-ns overflow-hidden-ns">
            <div id="projects-map" className="h-100 w-100 flex-50" />
            <div className="projects-container flex-50 pb4 overflow-auto h-100">
              {filteredProjects.map((project, i) => (
                <div
                  key={i}
                  className="project pointer flex items-center relative mb2 ph3 ph4-ns"
                >
                  <h3
                    className="project-title f5 f4-ns ma0 green lh-solid pr2 pr0-ns"
                    style={{ flexBasis: '50%' }}
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
                  <div
                    className="project-units flex-auto f6 f5-ns"
                    style={{ flexBasis: '15%' }}
                  >
                    {project.units} units
                  </div>
                  <div
                    className="type tc flex-auto dn db-ns"
                    style={{ flexBasis: '10%' }}
                  >
                    {project.type}
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
  const { markdownRemark: page } = data

  return (
    <ProjectsPageTemplate
      title={page.frontmatter.title}
      projects={page.frontmatter.projects}
      projectsBackground={page.frontmatter.projectsBackground}
    />
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
        projects {
          id
          title
          city
          state
          position {
            lat
            lng
          }
          units
          type
        }
      }
    }
  }
`
