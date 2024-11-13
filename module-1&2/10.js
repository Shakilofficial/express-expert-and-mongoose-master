// delete method 

//delete a item by id
// db.test.deleteOne({_id:ObjectId("6406ad63fc13ae5a40000066")})

//create a collection 

// db.createCollection("datas")

// insert an item in collection 

// db.posts.insertOne({test:"I am testing a document"})

//delete a collection 

db.datas.drop({writeConcern:{w:1}})