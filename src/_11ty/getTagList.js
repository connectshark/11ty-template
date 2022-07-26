module.exports = function(collection) {
  let tagSet = new Set()
  collection.getAll().forEach(item => {
    if( "tags" in item.data ) {
      let tags = item.data.tags
      tags = tags.filter(item => {
        switch(item) {
          case "all":
            return false
        }
        return true
      })
      for (const tag of tags) {
        tagSet.add(tag)
      }
    }
  })
  return [...tagSet]
}