//update 

// db.test.updateOne({ _id: ObjectId("6406ad63fc13ae5a40000065") },
//     {
//         $set: {
//             age: 89
//         }
//     })
//add value inside array
// db.test.updateOne({ _id: ObjectId("6406ad63fc13ae5a40000065") },
//     {
//         $addToSet: {
//             interests: "Driving"
//         }
//     })

//add multiple value means one more value update on the array elemenmt

// db.test.updateOne({ _id: ObjectId("6406ad63fc13ae5a40000065") },
//     {
//         $addToSet: {
//             interests: { $each: ["Singing", "Dancing"] }
//         }
//     })

// if i accepts duplicate value then use $push instead of $addToSet 

db.test.updateOne({ _id: ObjectId("6406ad63fc13ae5a40000065") },
    {
        $push: {
            interests: { $each: ["Cooking", "Reading"] }
        }
    })

db.test.find({ _id: ObjectId("6406ad63fc13ae5a40000065") })
