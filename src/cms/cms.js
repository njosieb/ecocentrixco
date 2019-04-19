import CMS from 'netlify-cms'
import AboutPagePreview from './preview-templates/AboutPagePreview'
import CertificationsPagePreview from './preview-templates/CertificationsPagePreview'
import ContactPagePreview from './preview-templates/ContactPagePreview'
import FaqPagePreview from './preview-templates/FaqPagePreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'
import ServicesPagePreview from './preview-templates/ServicesPagePreview'

CMS.registerPreviewStyle('/styles.css')
CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('certifications', CertificationsPagePreview)
CMS.registerPreviewTemplate('faq', ContactPagePreview)
CMS.registerPreviewTemplate('contact-us', FaqPagePreview)
CMS.registerPreviewTemplate('services', ServicesPagePreview)
CMS.registerPreviewTemplate('homepage', IndexPagePreview)
