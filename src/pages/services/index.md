---
templateKey: services-page
title: Services
subtitle: Energy needs are different for every type of project, and we've covered a lot of them in several locations across the country. Click the filters below to see the variety of projects we've worked with in the past.
---
  <div class="portfoilo-body ">
    <div class="filtering-tags mw8 center dn flex-ns flex-wrap justify-center mv3 tc items-center pv4">
      <span id="all-projects" class="project-filter mh3 pointer f4 blue fw7 br-pill bg-white ba ph3 pv2 b--gold mb3">All</span>
      <!-- {% for tag in site.data.config.tags %} -->
      <span data-tagname="<$ tag | replace(' ', '-') | lower $>" class="project-filter clickable mh3 pointer f4 blue fw7 br-pill bg-white ba ph3 pv2 b--gold mb3"><$ tag $></span>
      <!-- {% endfor %} -->
    </div>
    <div class="services-area flex-ns vh-50-ns overflow-hidden-ns">
      <div id="services-map" class="h-100 w-100 flex-50"></div>
      <div class="services-container flex-50 pb4 overflow-auto h-100">
        <!-- {% for project in site.data.services.projects %} -->
          <div data-job-id="<$ project.id $>" class="project pointer flex items-center relative mb2 ph3 ph4-ns <$ project.tags | string | replace(' ', '-') | replace(',', ' ') | lower $>">
            <h3 class="project-title f5 f4-ns ma0 green lh-solid pr2 pr0-ns" style="flex-basis: 50%">
              <span class="project-title-text underline-hover lh-copy"><$ project.title $></span>
            </h3>
            <div class="project-location f6 f5-ns flex-auto" style="flex-basis: 25%;"><$ project.city $>, <$ project.state $></div>
            <div class="project-units flex-auto f6 f5-ns" style="flex-basis: 15%;"><$ project.units $> units</div>
            <!-- <div class="type tc flex-auto dn db-ns" style="flex-basis: 10%;"><$ project.type $></div> -->
            <!-- {# <div class="tags tc flex-auto" style="flex-basis: 10%;">
              {% for tag in project.tags %}
                <a href="/services#<$ tag | lower $>" data-tagname="<$ tag | lower $>" class="filter-tag blue-darker underline-hover"><$ tag $></a>{% if not loop.last %}<span>, </span>{% endif %}
              {% endfor %}
            </div> #}
          </div>
          {% else %}
          <div>Projects Coming Soon!!</div>
        {% endfor %} -->
      </div>
    </div>
  </div>
</div>
