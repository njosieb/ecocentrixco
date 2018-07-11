import PropTypes from 'prop-types'
import React from 'react'

const Footer = ({ socialMediaLinks }) => (
  <section className="bt section-border">
    <div className="site-footer section-border">
      <div className="footer-top">
        <div className="container">
          <div className="footer-columns">
            <div className="footer-column" />
            <div className="footer-column">
              <ul className="social-media links">
                {socialMediaLinks.map((link, i) => (
                  <li key={i}>
                    <a className="social-media-link" href={link.url}>
                      <i className={`fa ${link.icon}`} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-column" />
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p className="copyright-row">
            <span className="copyright db di-ns">Copyright 2017</span>
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

Footer.propTypes = {
  socialMediaLinks: PropTypes.array
}

export default Footer
