// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import $ from 'jquery';
import 'waypoints';

$(() => {

  // Google Maps

  window.initMap = function() {
    const generateMarkers = function() {

    }

    const map = new google.maps.Map(document.getElementById('services-map'), {
      zoom: 5,
      center: { lat: 38.628141, lng: -90.209818 },
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
    })

    $.getJSON('/ecocentrixco/public/services.json', function(data) {
      const markers = data.projects.map((project, i) => {
        return new google.maps.Marker({
          position: project.position,
          // label: project.title,
          map: map
        })
      })

      const markerCluster = new MarkerClusterer(map, markers, {
        imagePath: '/images/m'
      })
    })
  }

  let sidebarVisible = false;

  const body = $('body');

  $('#menu-reveal').click(function() {
    sidebarVisible = !sidebarVisible;
    if (sidebarVisible) {
      body.addClass('menuOpen');
    } else {
      body.removeClass('menuOpen');
    }
  });

  $('.section-link').click(function() {
    body.removeClass('menuOpen');
    sidebarVisible = false;
  });

  // Filtering projects
  const filterableTags = ['energy-audit', 'energy-audit-review', 'energy-star', 'national-green-building-standard', 'home-energy-rating-system']

  const filterProjects = function (clicked) {
    $('.project').hide()
    $('.active-tag').removeClass('active-tag')
    $(`.project-filter[data-tagname="${clicked}"]`).addClass('active-tag')
    $('.project').filter(`.${clicked}`).show()
  }

  $(document).ready(function() {
    if (window.location.pathname === '/services/') {
      if (filterableTags.some(tag => tag === window.location.hash.substring(1))) {
        filterProjects(window.location.hash.substring(1))
      } else {
        window.location.hash = ''
        $('#all-projects').addClass('active-tag')
      }
    }
  })

  $('#all-projects').click(function() {
    window.location.hash = ''
    $('.active-tag').removeClass('active-tag')
    $(this).addClass('active-tag')
    $('.project').show()
  })

  $('.filter-tag, .project-filter.clickable').click(function(event) {
    event.preventDefault()
    const filteringTag = $(this).data('tagname')
    window.location.hash = `#${filteringTag}`
    filterProjects($(this).data('tagname'))
  })

});
