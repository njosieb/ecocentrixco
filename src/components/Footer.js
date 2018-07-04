import React from 'react'

const Footer = () => (
  <section className="bt section-border">
    <div className="site-footer section-border">
      <div className="footer-top">
        <div className="container">
          <div className="footer-columns">
            <div className="footer-column" />
            <div className="footer-column">
              <ul className="social-media links">
                <li>
                  <a
                    className="social-media-link"
                    href="https://www.facebook.com/ECOcentrix-Consulting-LLC-225325200871400/"
                  >
                    <i className="fa fa-facebook" />
                  </a>
                </li>
                <li>
                  <a
                    className="social-media-link"
                    href="https://twitter.com/ecocentrixco"
                  >
                    <i className="fa fa-twitter" />
                  </a>
                </li>
                <li>
                  <a
                    className="social-media-link"
                    href="mailto:mollie@ecocentrixco.com"
                  >
                    <i className="fa fa-envelope-o" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-column" />
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p className="copyright-row">
            <span className="copyright">Copyright 2017</span>
            <span className="made-by">
              Site built by{' '}
              <a
                href="http://cvharris.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                CV Harris Design, LLC.
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
  </section>
)

export default Footer
