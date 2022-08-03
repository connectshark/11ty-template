const markdownIt = require("markdown-it")
const markdownItAnchor = require("markdown-it-anchor")
const markdownItContainer = require('markdown-it-container')
const markdownItTableOfContents = require("markdown-it-table-of-contents")
const pluginNavigation = require("@11ty/eleventy-navigation")
const pluginRss = require("@11ty/eleventy-plugin-rss")
const dayjs = require('dayjs')
const fs = require("fs")
const NOT_FOUND_PATH = '/404.html'

const tagController = require('./src/_11ty/getTagList')
const now = String(Date.now())
module.exports = eleventyConfig => {
  const markdownItp = markdownIt()

  eleventyConfig.addPassthroughCopy('src/assets')
  eleventyConfig.addPassthroughCopy({ 'public/' : '.' })
  eleventyConfig.addShortcode('version', function () {
    return now
  })
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return dayjs(dateObj).format('YYYY-MM-DD')
  })

  eleventyConfig.addCollection("tagList", tagController)

  eleventyConfig.addPlugin(pluginNavigation)
  eleventyConfig.addPlugin(pluginRss, {
    posthtmlRenderOptions: {
      closingSingleTag: "default"
    }
  })
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, bs) {

        bs.addMiddleware("*", (req, res) => {
          if (!fs.existsSync(NOT_FOUND_PATH)) {
            throw new Error(`Expected a \`${NOT_FOUND_PATH}\` file but could not find one. Did you create a 404.html template?`);
          }
          const content_404 = fs.readFileSync(NOT_FOUND_PATH)
          res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" })
          res.write(content_404)
          res.end()
        })
      }
    }
  });
  const markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItAnchor, {
    level: [2,3,4]
  }).use(markdownItTableOfContents, {
    includeLevel: [1, 2, 3, 4]
  }).use(markdownItContainer, 'summary', {
    validate: function (params) {
      return params.trim().match(/^spoiler\s+(.*)$/);
    },
    render: function (tokens, idx) {
      var m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/);
      if (tokens[idx].nesting === 1) {
        return '<details><summary>' + markdownItp.utils.escapeHtml(m[1]) + '</summary>\n';
      } else {
        return '</details>\n'
      }
    }
  }).use(markdownItContainer, "success")
  .use(markdownItContainer, "info")
  .use(markdownItContainer, "warning")
  .use(markdownItContainer, "danger")
  eleventyConfig.setLibrary("md", markdownLibrary)
  return {
    dir: {
      input: 'src',
      output: 'dist'
    },
    markdownTemplateEngine: 'njk'
  }
}