MongoDB-এর Aggregation Framework বিভিন্ন ধাপে ডেটা সংগ্রহ, বিশ্লেষণ এবং পুনর্গঠন করার একটি শক্তিশালী টুল। এটি ব্যবহার করে আপনি ডেটা ফিল্টার করতে, গোষ্ঠীভুক্ত করতে, এবং রূপান্তর করতে পারবেন। এখানে আমরা একটি নমুনা ডকুমেন্ট এবং কিছু কমন Aggregation স্টেজ উদাহরণ হিসেবে ব্যবহার করছি।

---

### উদাহরণ ডকুমেন্ট
এই ডকুমেন্টে নাম, ইমেইল, ঠিকানা, চাকরি, বন্ধুরা এবং বিভিন্ন স্কিল সম্পর্কিত তথ্য রয়েছে। এটি এমন দেখতে পারে:

```json
{
    "_id": ObjectId("6406ad63fc13ae5a40000067"),
    "name": { "firstName": "Ahmad", "lastName": "McCurry" },
    "email": "amccurry3@cnet.com",
    "phone": "(691) 1462054",
    "gender": "Male",
    "age": 38,
    "address": { "street": "54 Shasta Center", "city": "Qandala", "country": "Somalia" },
    "occupation": "Research Associate",
    "friends": [ "Mir Hussain", "Abdur Rakib", "Najmus Sakib", "Rasel Ahmed" ],
    "skills": [
        { "name": "JAVASCRIPT", "level": "Expert", "isLearning": true },
        { "name": "KOTLIN", "level": "Expert", "isLearning": false },
        { "name": "JAVA", "level": "Intermediate", "isLearning": true }
    ]
}
```

---

## ১. `$match` এবং `$project` ব্যবহার করে ফিল্টারিং ও ফিল্ড নির্বাচন
`$match` স্টেজ ব্যবহার করে নির্দিষ্ট কন্ডিশনের ডকুমেন্টগুলো ফিল্টার করা যায়। `$project` ফিল্ডগুলোকে শেপ বা ফিল্টার করতে সাহায্য করে।

### উদাহরণ:
```javascript
db.users.aggregate([
  { $match: { gender: "Male", age: { $gte: 30 } } },
  { $project: { name: 1, email: 1, occupation: 1, _id: 0 } }
]);
```
**উদ্দেশ্য**: ৩০ বছর বা তার বেশি বয়সের পুরুষদের তথ্য প্রদর্শন করবে, এবং শুধুমাত্র নাম, ইমেইল ও চাকরি তথ্য দেখাবে।

---

## ২. `$addFields`, `$out`, এবং `$merge` ব্যবহার করে নতুন ফিল্ড যোগ করা এবং আউটপুট করা
`$addFields` ডকুমেন্টে নতুন ফিল্ড যোগ করে। `$out` রেজাল্ট নতুন সংগ্রহে সংরক্ষণ করে।

### উদাহরণ:
```javascript
db.users.aggregate([
  { $addFields: { fullName: { $concat: ["$name.firstName", " ", "$name.lastName"] } } },
  { $out: "user_fullnames" }
]);
```
**উদ্দেশ্য**: `firstName` এবং `lastName` একত্রিত করে `fullName` ফিল্ড তৈরি করবে এবং নতুন `user_fullnames` সংগ্রহে সংরক্ষণ করবে।

---

## ৩. `$group`, `$sum`, এবং `$push` ব্যবহার করে গোষ্ঠীভুক্তকরণ ও অ্যারে তৈরি
`$group` নির্দিষ্ট ফিল্ড অনুযায়ী ডকুমেন্টগুলোকে গোষ্ঠীভুক্ত করে। `$sum` টোটাল গণনা করে।

### উদাহরণ:
```javascript
db.users.aggregate([
  { $group: { _id: "$occupation", avgSalary: { $avg: "$salary" }, names: { $push: "$name.firstName" } } }
]);
```
**উদ্দেশ্য**: চাকরি অনুযায়ী গোষ্ঠীভুক্ত করবে, প্রতিটি গোষ্ঠীর গড় বেতন এবং ব্যবহারকারীদের নামের তালিকা দেখাবে।

---

## ৪. `$unwind` ব্যবহার করে অ্যারেকে বিভাজিতকরণ
`$unwind` একটি অ্যারেকে পৃথক ডকুমেন্টে বিভাজিত করে।

### উদাহরণ:
```javascript
db.users.aggregate([
  { $unwind: "$skills" },
  { $group: { _id: "$skills.name", count: { $sum: 1 } } }
]);
```
**উদ্দেশ্য**: প্রতিটি স্কিলের জন্য গুনতি দেখাবে।

---

## ৫. `$bucket` এবং `$sort` দিয়ে তথ্য শ্রেণিবদ্ধকরণ
`$bucket` ফিল্ডের মান অনুযায়ী ডেটা শ্রেণিবদ্ধ করে এবং `$sort` আউটপুটকে সাজায়।

### উদাহরণ:
```javascript
db.users.aggregate([
  { $bucket: { groupBy: "$age", boundaries: [20, 30, 40, 50], output: { count: { $sum: 1 } } } },
  { $sort: { count: -1 } }
]);
```
**উদ্দেশ্য**: বয়সের সীমা অনুযায়ী ব্যবহারকারীদের গুনতি করে।

---

## ৬. `$facet` দিয়ে মাল্টিপল পাইপলাইনে বিশ্লেষণ
`$facet` ব্যবহার করে একই ডেটাসেটে একাধিক বিশ্লেষণ একসাথে করা যায়।

### উদাহরণ:
```javascript
db.users.aggregate([
  {
    $facet: {
      "Top Skills": [{ $unwind: "$skills" }, { $group: { _id: "$skills.name", count: { $sum: 1 } } }, { $sort: { count: -1 } }],
      "Avg Salary by Occupation": [{ $group: { _id: "$occupation", avgSalary: { $avg: "$salary" } } }]
    }
  }
]);
```
**উদ্দেশ্য**: একই সময়ে শীর্ষ স্কিল এবং প্রতিটি চাকরির গড় বেতন দেখাবে।

---

MongoDB-এর Aggregation Framework এবং উপরের টুলগুলো বিভিন্ন ডেটা ম্যানিপুলেশনে অত্যন্ত কার্যকর।