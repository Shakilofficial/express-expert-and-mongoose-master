//group, sum, push aggregation stage 

db.test.aggregate([
    //stage-1: group is basically use for grouping document by specific field or value, sum is use for accumulate the field count 

    // { $group: { _id: "$age", count: { $sum: 1 } } }
    // { $group: { _id: "$gender", count: { $sum: 1 } } }
    //when i need specific document field use $push: "$name" ---> name shows the name only, if i want to see all document then we need to  ohe"$$ROOT" instead of "$name"risuse 
    { $group: { _id: "$address.country", count: { $sum: 1 }, peoples: { $push: "$$ROOT" } } },

    //if i want to just give name email and phone then we need to use project 
    {
        $project: {
            "peoples.name": 1,
            "peoples.email": 1,
            "peoples.phone": 1
        }
    }

])