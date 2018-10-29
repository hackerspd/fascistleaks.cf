const fs = require('fs')
const klaw = require('klaw')
const path = require('path')
const matter = require('gray-matter')

const getMD = (filePath) => {
    const items = []
    // Walk ("klaw") through posts directory and push file paths into items array //
    const getFiles = (filePath) => new Promise(resolve => {
        // Check if posts directory exists //
        if (fs.existsSync(filePath)) {
            klaw(filePath)
                .on('data', item => {
                    // Filter function to retrieve .md files //
                    if (path.extname(item.path) === '.md') {
                        // If markdown file, read contents //
                        const data = fs.readFileSync(item.path, 'utf8')
                        // Convert to frontmatter object and markdown content //
                        const dataObj = matter(data)
                        // Create slug for URL //
                        const slug = dataObj.data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
                        dataObj.data.slug = slug
                        dataObj.key = slug
                        // Remove unused key //
                        delete dataObj.orig
                        // Push object into items array //
                        items.push(dataObj)
                    }
                })
                .on('error', e => {
                    console.log(e)
                })
                .on('end', () => {
                    // Resolve promise for async getRoutes request //
                    // posts = items for below routes //
                    resolve(items.reverse().reduce((acc, cur) => ({
                        ...acc,
                        [cur.data.id || cur.data.slug] : cur
                    }), {}))
                })
        } else {
            // If src/posts directory doesn't exist, return items as empty object //
            resolve({})
        }
    })
    return getFiles(filePath)
}

module.exports = { getMD }
