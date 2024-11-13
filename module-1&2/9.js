// more use of $set operator 
//update multiple value of object 
// db.test.updateOne({ _id: ObjectId("6406ad63fc13ae5a40000066") }, {
//     $set: {
//         "address.city": "Dhaka",
//         "address.postalCode": "1300",
//         "address.country": "Bangladesh"
//     }
// })


//update array of objects we need to positional 

// db.test.updateOne({ _id: ObjectId("6406ad63fc13ae5a40000066"), "education.major": "Philosophy" }, {
//     $set: {
//         "education.$.major": "CSE"
//     }
// })

//increment a value by inc value --> 

db.test.updateOne({ _id: ObjectId("6406ad63fc13ae5a40000066") }, {
    $inc: {
        age: 1
    }
})

db.test.find({ _id: ObjectId("6406ad63fc13ae5a40000066") })
    .projection({})
    .sort({})
    .limit(0)