//$lookup stage, embedding vs referencing

db.orders.aggregate([
    //$lookup
    {
        $lookup: {
            from: "test",
            localField: "userId",
            foreignField: "_id",
            as: "user"
        }
    }

])