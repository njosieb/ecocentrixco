import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Helmet from 'react-helmet'

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

class ServicesPageTemplate extends Component {
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
      document.getElementById('services-map'),
      {
        zoom: 5,
        center: { lat: 38.628141, lng: -90.209818 },
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false
      }
    )

    this.filterProjects(this.state.activeTag, map)
  }

  render() {
    const { title, subtitle } = this.props
    const { activeTag, filteredProjects } = this.state

    return (
      <div className="services-main">
        <Helmet
          script={[
            {
              src:
                'https://maps.googleapis.com/maps/api/js?key=AIzaSyBsuCjHZUuNmjtfjwxYsFGj8aouf18e9aU',
              async: true,
              defer: true
            },
            {
              src: '/scripts/markerclusterer.js'
            }
          ]}
          onChangeClientState={(newState, addedTags) =>
            this.setGoogleMapOnLoad(addedTags)
          }
        />
        <div className="pt3 bg-blue">
          <h1 className="mw8 ph4 f1 f-5-ns center white mv0 lh-copy">
            {title}
          </h1>
          <p className="f3 ma0 mw7 center pt2 ph4 ph0-ns pb5-ns white">
            {subtitle}
          </p>
        </div>
        <div className="portfoilo-body ">
          <div className="filtering-tags mw8 center dn flex-ns flex-wrap justify-center mv3 tc items-center pv4">
            {tagList.map(tag => (
              <span
                key={tag.value}
                onClick={() => this.filterProjects(tag.value)}
                className={`${
                  activeTag === tag.value ? 'active-tag ' : ''
                }project-filter clickable mh3 pointer f4 blue fw7 br-pill bg-white ba ph3 pv2 b--gold mb3`}
              >
                {tag.label}
              </span>
            ))}
          </div>
          <div className="services-area flex-ns vh-50-ns overflow-hidden-ns">
            <div id="services-map" className="h-100 w-100 flex-50" />
            <div className="services-container flex-50 pb4 overflow-auto h-100">
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

ServicesPageTemplate.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  projects: PropTypes.array
}

const ServicesPage = ({ data }) => {
  const { markdownRemark: page } = data

  return (
    <ServicesPageTemplate
      title={page.frontmatter.title}
      subtitle={page.frontmatter.subtitle}
      projects={page.frontmatter.projects}
    />
  )
}

ServicesPage.propTypes = {
  data: PropTypes.object
}

export default ServicesPage

export const ServicesPageQuery = graphql`
  query ServicesQuery {
    markdownRemark(frontmatter: { templateKey: { eq: "services-page" } }) {
      frontmatter {
        title
        subtitle
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
