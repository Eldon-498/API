const { Datastore } = require('notarealdb')
const store = new Datastore('./data')
module.exports = {
    students: store.collection('students'),
    colleges: store.collection('colleges')
}
