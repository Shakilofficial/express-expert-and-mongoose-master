//$in $nin, implicit and condition : Comparison Operator

//implicit and
// db.test.find({ gender: "Female", age: { $gte: 18, $lte: 30 } })
//     .projection({name:1,gender:1,age:1})
//     .sort({ age: 1 })
//     .limit(0)


// implicit in and nin operator 

db.test.find({ gender: "Female", age: { $nin: [18, 20, 22, 24, 26, 28, 30] }, interests: { $in: ["Cooking", "Gaming"] } })
    .projection({ name: 1, gender: 1, age: 1, interests: 1 })
    .sort({ age: 1 })
    .limit(0)
