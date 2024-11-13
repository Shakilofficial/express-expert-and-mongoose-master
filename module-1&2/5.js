//element query $exists, $type, $size 

// db.test.find({ age: { $exists: true } })
//     .projection({})
//     .sort({})
//     .limit(0)
// db.test.find({ age: { $type: "number" } })
//     .projection({})
//     .sort({})
//     .limit(0)

db.test.find({ friends: { $size: 5 } })
    .projection({friends:1})
    .sort({})
    .limit(0)