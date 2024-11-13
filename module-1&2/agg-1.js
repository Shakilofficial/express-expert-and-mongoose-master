//aggregation

// find data by $match method

// db.test.aggregate([
//     //stage-1
//     { $match: { gender: "Male", age: { $lt: 30 } } },
//     //stage-2
//     { $project: { name: 1, gender: 1, age: 1 } }
// ])

//add field using aggregation 

db.test.aggregate([
    { $match: { gender: "Male" } },
    { $addFields: { course: "Level-2", eduTech: "Programming Hero" } },

    { $project: { course: 1, eduTech: 1 } },
    // if i want to create new collection, just simply use $out , or want to modify or add these on orginal collection use merge 
    { $merge: "test" }
])