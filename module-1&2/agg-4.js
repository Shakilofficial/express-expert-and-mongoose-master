//$group and $unwind agg method

// db.test.aggregate([
//     //stage 
//     { $unwind: "$friends" },
//     //stage-2
//     { $group: { _id: "$friends", count: { $sum: 1 } } }
// ])

//lets calculate assume interests by age

db.test.aggregate([
    //stage-1
    { $unwind: "$interests" },
    //stage-2
    { $group: { _id: "$age", interestsPerAge: { $push: "$interests" } } }

])