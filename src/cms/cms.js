import CMS from 'netlify-cms'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import CertificationsPagePreview from './preview-templates/CertificationsPagePreview'
import ContactPagePreview from './preview-templates/ContactPagePreview'
import FaqPagePreview from './preview-templates/FaqPagePreview'
import ServicesPagePreview from './preview-templates/ServicesPagePreview'
import HomepagePreview from './preview-templates/HomepagePreview'

CMS.registerPreviewStyle('/styles.css')
CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('certifications', CertificationsPagePreview)
CMS.registerPreviewTemplate('faq', ContactPagePreview)
CMS.registerPreviewTemplate('contact-us', FaqPagePreview)
CMS.registerPreviewTemplate('services', ServicesPagePreview)
CMS.registerPreviewTemplate('homepage', HomepagePreview)
