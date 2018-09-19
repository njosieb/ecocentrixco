# Ecocentrixco Website

## Adding Images

### 1. config.yml
  ```yaml
    - label: New Image
      name: newImage
      widget: image
  ```
### 2. gatsby-node.js
  In the `onCreateNode` function, pull the property off the `frontmatter` data like so:
  ```js
    const { ..., newImage } = frontmatter
  ```
  Then, add the condition for `adjust`ing the image like so:
  ```js
      if (newImage) {
        node.frontmatter.newImage = adjust(newImage)
      }
  ```
  **Note:** It is slightly different if the image is nested inside a list. In that case, get the parent list field off `frontmatter`...
  ```js
    const { ..., newList } = frontmatter
  ```
  Then, add the condition for `adjust`ing the image like so:
  ```js
      if (newList) {
        node.frontmatter.newList.forEach(listItem => {
          listItem.newImage = adjust(listItem.newImage)
        })
      }
  ```
### 3. <yourpage>.md
  Set the image property on the page to the url of the image's location, like so:
  ```yaml
  newImage: /img/awesome-pic.jpg
  ```
### 4. <yourtemplate>.js
  Now comes the tedious parts. **First**, add the image to the template's GraphQL code.
  - `sizes`: 'fluid' or responsive image sizes, good for edge-to-edge images
  - `resolutions`: 'fixed' or set height and/or width use cases

  ```graphql
  newImage {
    childImageSharp {
      sizes(maxWidth: 1400) {
        ...GatsbyImageSharpSizes
      }
    }
  }
  ```
  Then, you have to add the property to the Template's `Proptypes`:
  ```js
  IndexPageTemplate.propTypes = {
    newImage: PropTypes.object
  }
  ```
  Next, set the props from graphQL data onto the Template Component:
  ```js
    const AwesomePage = ({ data }) => {
      const { newImage } = data.markdownRemark.frontmatter

      return (
        <AwesomePageTemplate newImage={newImage} />
      )
    }
  ```
  To make it nicer to work with in our JSX, extract the prop from the Template's `props`
  ```js
  render() {
    const { newImage } = this.props
    ...
  }
  ```
  Now, at last, you can use the image in the Gatsby Images!
  ```js
    <Img sizes={newImage.childImageSharp.sizes} />
  ```

## TODO
- [x] Convert whole site to GatsbyJS from Gulp/jQuery
- [x] Configure Netlify CMS
  - [x] Home Page
  - [x] About Us Page
  - [x] Certifications Page
  - [x] FAQ Page
  - [x] Contact Us Page
  - [x] Services Page
    - [x] List of projects
    - [x] Restore Google maps
    - [x] Filter list
- [x] Make Contact block and map reusable component
- [x] Fix color scheme and layout
- [x] Replace header video with high quality photo
- [x] Make mobile friendly
- [ ] Host on Netlify
