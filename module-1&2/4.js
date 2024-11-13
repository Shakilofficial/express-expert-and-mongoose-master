// $and , $or, implicit, explicit

// db.test.find({ age: { $ne: 15, $lte: 30 } })
//     .projection({})
//     .sort({})
//     .limit(0)

//explicit and / or operator 
// db.test.find({ $and: [{ gender: "Female" }, { age: { $ne: 15 } }, { age: { $lte: 30 } }] })
//     .projection({ name: 1, gender: 1, age: 1 })
//     .sort({ age: 1 })
//     .limit(0)

// db.test.find({ $or: [{ "skills.name": "JAVASCRIPT" }, { "skills.name": "PYTHON" }] })
//     .projection({ name: 1, skills: 1 })
//     .sort({ age: 1 })
//     .limit(0)

//use in 
db.test.find({ "skills.name": { $in: ["JAVASCRIPT", "PYTHON"] } })
    .projection({ name: 1, skills: 1 })
    .sort({ age: 1 })
    .limit(0)



