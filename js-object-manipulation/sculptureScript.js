const sculptureList = require('./data.js')
let sculptureListLengths = {}
let count = 0
let tmp = {}

for (let i in sculptureList) {
    tmp = Object.assign({}, sculptureList[i])
    for (let j in tmp) {
        tmp[j] = tmp[j].length
    }
    sculptureListLengths[i] = tmp
}
