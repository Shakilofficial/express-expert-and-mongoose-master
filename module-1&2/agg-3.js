//explore more about $group, $group

db.test.aggregate([
    //stage-1
    {
        $group: {
            _id: null, totalSalary: { $sum: "$salary" }, maxSalary: { $max: "$salary" }, avgSalary: { $avg: "$salary" }, minSalary: { $min: "$salary" }
        }
    },
    //stage-2
    {
        $project: {
            totalSalary: 1,
            maxSalary: 1,
            minSalary: 1,
            averageSalary: "$avgSalary", //here rename the fieldname 
            salaryRange: { $subtract: ["$maxSalary", "$minSalary"] }
        }
    }
])