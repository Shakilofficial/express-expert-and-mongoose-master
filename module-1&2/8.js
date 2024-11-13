//unset, pop, pull, pullAll

// remove a element 
// db.test.updateOne({_id:ObjectId("6406ad63fc13ae5a40000065")},{$unset: {birthday: "" }})

//remove a last element from an array
// db.test.updateOne({_id:ObjectId("6406ad63fc13ae5a40000065")},{$pop: {friends:1}})

//remove a first element from an array
// db.test.updateOne({_id:ObjectId("6406ad63fc13ae5a40000065")},{$pop: {friends:-1}})

//remove a spefcific element from an  array 
// db.test.updateOne({ _id: ObjectId("6406ad63fc13ae5a40000065") }, { $pull: { friends: "Fahim Ahammed Firoz" } })

// remove one more element from an  array 
db.test.updateOne({ _id: ObjectId("6406ad63fc13ae5a40000065") }, { $pullAll: { languages: ["German", "Catalan", "Thai"] } })

db.test.find({ _id: ObjectId("6406ad63fc13ae5a40000065") })
