//array, object, and array of object query $all $elemMatch
//positional find of array
// db.test.find({ interests:{$all: ["Gardening", "Gaming", "Cooking"] }})
//     .projection({ interests: 1 })
//     .sort({})
//     .limit(0)


db.test.find({ skills: { $elemMatch: { name: "JAVASCRIPT", level: "Intermidiate" } } })
    .projection({ skills: 1 })
    .sort({})
    .limit(0)