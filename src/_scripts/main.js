// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import $ from 'jquery';
import 'waypoints';

$(() => {
  const jWindow = $(window);

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

  if (window.location.pathname === '/' && jWindow.width() >= 600) {
    // const topSection = $('#top-splash')

    // jWindow.on('scroll', () => {
    //   topSection.find('.parallax-image').css('transform', `translate3d(0, ${jWindow.scrollTop() * -.3}px, 0)`)
    // })
  }
});
