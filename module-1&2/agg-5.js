// $bucket, $sort , $limit 

db.test.aggregate([
    //stage-1
    {
        $bucket: {
            groupBy: "$age",
            boundaries: [20, 40, 60, 80],
            default: "More than 80",
            output: {
                "count": { $sum: 1 },
                "name": { $push: "$$ROOT" }
            }
        }
    },
    //stage-2
    { $sort: { count: -1 } },
    //stage-3
    {$limit: 2}, //use for showing document 
    //stage-4
    { $project: { count: 1 } }
])