// indexing, COLLSCAN, IXSCAN
//createIndex 
// db.getCollection("massive-data").createIndex({ email: 1 })
//drop index ---> delete a index 
// db.getCollection("massive-data").dropIndex({ email: 1 })


// db.getCollection("massive-data").createIndex({about:"text"})
db.getCollection("massive-data").find({ $text: { $search: "dolor" } }).project({ about: 1 })