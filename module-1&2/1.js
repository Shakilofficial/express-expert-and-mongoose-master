//field filtering

// db.test.findOne({gender:"Male"},{gender:1,name:1,email:1})

// another way for field filtering (mostly used this filtering) projection method is not work with findOne

db.test.find({gender:"Male"})
   .projection({name:1,email:1,gender:1})
   .sort({})
   .limit(0)