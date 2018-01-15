// import _ from 'lodash'

let mydata = {}

const flattenTree = (parrent, restree=[]) => {
    restree = _.concat(_.cloneDeep(restree), _.cloneDeep(parrent))

    let children = _.chain(parrent)
    .map('childrens')
    .flatten()
    .compact()
    .value()

    if(_.size(children)) {
        return flattenTree(children, restree)
    } else {
        return restree
    }
}

const PlayTreeIndexByCid = {
	get(cid) {
	    if (cid) {
	        return mydata[cid]
        }
		return mydata
	},
	set(data) {
		mydata = _.keyBy( flattenTree(data), 'cid')
	}
}

export default PlayTreeIndexByCid