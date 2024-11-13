//Operators in MongoDB
//eq,ne,gt,gte,lt,lte

// db.test.find({gender:{$ne: "Male"}}) 
//   .projection({})
//   .sort({})
//   .limit(0)

db.test.find({ age: { $lte: 18 } })
    .projection({})
    .sort({ age: 1 })
    .limit(0)   