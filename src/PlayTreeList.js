let mydata = []

const PlayTreeList = {
	get() {
		return mydata
	},
	set(data) {
		mydata = data
	}
}

export default PlayTreeList