# Basics of MongoDB
এখানে MongoDB-এর সাধারণ কিছু কমান্ড এবং অপারেটর নিয়ে বিস্তারিত আলোচনা করা হয়েছে। চলুন, প্রতিটি অংশ বুঝে দেখি:

---

### **বেসিক CRUD অপারেশন এবং প্রকজেকশন**

CRUD মানে হল **Create, Read, Update, এবং Delete**। MongoDB এই অপারেশনগুলো কীভাবে পরিচালনা করে, তা নিচে দেখানো হয়েছে:

#### **ডকুমেন্ট ইনসার্ট করা: `insertOne` এবং `insertMany`**

MongoDB-তে ডেটা যোগ করা খুবই সহজ। একক ডকুমেন্ট যোগ করতে `insertOne` এবং একাধিক ডকুমেন্ট যোগ করতে `insertMany` ব্যবহার করা হয়।

```javascript
// একক ডকুমেন্ট ইনসার্ট করা
db.users.insertOne({ name: "Alice", age: 28, city: "New York" });

// একাধিক ডকুমেন্ট ইনসার্ট করা
db.users.insertMany([
  { name: "Bob", age: 35, city: "San Francisco" },
  { name: "Charlie", age: 40, city: "Los Angeles" },
]);
```

#### **ডকুমেন্ট রিট্রিভ করা: `find` এবং `findOne` সহ ফিল্ড ফিল্টারিং**

`find` ব্যবহার করে একাধিক ডকুমেন্ট বা `findOne` ব্যবহার করে একক ডকুমেন্ট বের করা যায়। আপনি `projection` ব্যবহার করে কোন ফিল্ডগুলো দেখাতে চান তা সীমাবদ্ধ করতে পারেন।

```javascript
// "New York" শহরের সব ইউজার খুঁজুন এবং শুধুমাত্র "name" ফিল্ড দেখান
db.users.find({ city: "New York" }, { name: 1, _id: 0 });

// একক ইউজার খুঁজুন যার নাম "Alice" এবং শুধুমাত্র "name" এবং "age" দেখান
db.users.findOne({ name: "Alice" }, { name: 1, age: 1, _id: 0 });
```

---

### **কম্প্যারিজন অপারেটর: শর্তে ডেটা ফিল্টারিং**

MongoDB-র কম্প্যারিজন অপারেটরগুলি আপনাকে কুয়েরিতে নির্দিষ্ট শর্ত মিলিয়ে ডেটা খুঁজতে সাহায্য করে।

#### **কমন কম্প্যারিজন অপারেটর: `$eq`, `$ne`, `$gt`, `$lt`, `$gte`, `$lte`**

- `$eq`: "সমান"
- `$ne`: "সমান নয়"
- `$gt`: "বড়"
- `$lt`: "ছোট"
- `$gte`: "বড় বা সমান"
- `$lte`: "ছোট বা সমান"

```javascript
// বয়স 28 এর সমান ইউজার খুঁজুন
db.users.find({ age: { $eq: 28 } });

// বয়স 28 এর সমান নয় এমন ইউজার খুঁজুন
db.users.find({ age: { $ne: 28 } });

// বয়স 30 এর বেশি এমন ইউজার খুঁজুন
db.users.find({ age: { $gt: 30 } });

// বয়স 35 এর কম এমন ইউজার খুঁজুন
db.users.find({ age: { $lt: 35 } });
```

---

### **ইনক্লুশন অপারেটর: `$in` এবং `$nin`**

এই অপারেটরগুলি আপনাকে এমন ডকুমেন্ট খুঁজতে দেয় যেখানে একটি ফিল্ডের মান নির্দিষ্ট মানের তালিকায় রয়েছে বা নেই।

```javascript
// "New York" বা "San Francisco" শহরের ইউজার খুঁজুন
db.users.find({ city: { $in: ["New York", "San Francisco"] } });

// "Los Angeles" বা "San Francisco" শহরে না থাকা ইউজার খুঁজুন
db.users.find({ city: { $nin: ["Los Angeles", "San Francisco"] } });
```

---

### **লজিকাল অপারেটর: `$and` এবং `$or`**

লজিকাল অপারেটরগুলির মাধ্যমে আপনি একাধিক শর্ত একসাথে যোগ করতে পারেন।

```javascript
// বয়স 30 এর বেশি এবং শহর "New York" এমন ইউজার খুঁজুন
db.users.find({ $and: [{ age: { $gt: 30 } }, { city: "New York" }] });

// বয়স 30 এর নিচে বা শহর "Los Angeles" এমন ইউজার খুঁজুন
db.users.find({ $or: [{ age: { $lt: 30 } }, { city: "Los Angeles" }] });
```

---

### **ডেটা ইন্সপেকশন অপারেটর: `$exists`, `$type`, এবং `$size`**

এই অপারেটরগুলি আপনাকে বিশেষ কিছু শর্ত যেমন একটি ফিল্ডের অস্তিত্ব, ডেটা টাইপ এবং অ্যারে সাইজ পরীক্ষা করতে সাহায্য করে।

```javascript
// "city" ফিল্ড আছে এমন ইউজার খুঁজুন
db.users.find({ city: { $exists: true } });

// "age" ফিল্ডের টাইপ "number" এমন ইউজার খুঁজুন
db.users.find({ age: { $type: "number" } });

// "tags" অ্যারে যার সাইজ 3 ঠিকানা এমন ইউজার খুঁজুন
db.users.find({ tags: { $size: 3 } });
```

---

### **অ্যারে অপারেটর: `$all` এবং `$elemMatch`**

এই অপারেটরগুলি অ্যারে সম্পর্কিত কাজ করতে সাহায্য করে।

- `$all` ব্যবহার করলে অ্যারের সব উপাদান থাকতে হবে।
- `$elemMatch` ব্যবহার করলে, কোনো একটি উপাদান নির্দিষ্ট শর্ত পূরণ করলে সে ডকুমেন্ট মিলবে।

```javascript
// "developer" এবং "javascript" ট্যাগ সহ ইউজার খুঁজুন
db.users.find({ tags: { $all: ["developer", "javascript"] } });

// "TechCorp" কোম্পানির অন্তর্গত অভিজ্ঞতায় যেখানে 2+ বছর কাজ করা হয়েছে এমন ইউজার খুঁজুন
db.users.find({
  experience: { $elemMatch: { company: "TechCorp", years: { $gte: 2 } } },
});
```

---

### **ডকুমেন্ট আপডেট করা: `$set`, `$addToSet`, `$push`**

ডকুমেন্ট আপডেট করার জন্য এই অপারেটরগুলি ব্যবহার করা হয়।

```javascript
// "Alice" এর শহর "Chicago" তে আপডেট করুন
db.users.updateOne({ name: "Alice" }, { $set: { city: "Chicago" } });

// "tags" অ্যারে তে একটি ইউনিক ট্যাগ যোগ করুন
db.users.updateOne({ name: "Alice" }, { $addToSet: { tags: "backend" } });

// "skills" অ্যারে তে একটি নতুন স্কিল যোগ করুন (ইউনিকনেস চেক না করে)
db.users.updateOne({ name: "Alice" }, { $push: { skills: "MongoDB" } });
```

---

### **ফিল্ড বা অ্যারে উপাদান অপসারণ: `$unset`, `$pop`, `$pull`, `$pullAll`**

এই অপারেটরগুলি ডকুমেন্ট থেকে ফিল্ড বা অ্যারে উপাদান অপসারণ করতে সাহায্য করে।

```javascript
// "city" ফিল্ডটি ডিলিট করুন
db.users.updateOne({ name: "Alice" }, { $unset: { city: "" } });

// "skills" অ্যারে থেকে শেষ উপাদান অপসারণ করুন
db.users.updateOne({ name: "Alice" }, { $pop: { skills: 1 } });

// "Node.js" স্কিলটি "skills" অ্যারে থেকে সরিয়ে ফেলুন
db.users.updateOne({ name: "Alice" }, { $pull: { skills: "Node.js" } });

// "MongoDB" এবং "Express" স্কিলগুলো "skills" অ্যারে থেকে সরিয়ে ফেলুন
db.users.updateOne(
  { name: "Alice" },
  { $pullAll: { skills: ["MongoDB", "Express"] } }
);
```

---

### **অ্যাডভান্সড `$set` ব্যবহার**

`$set` অপারেটরটি nested ফিল্ড আপডেট করতে বা নতুন ফিল্ড তৈরি করতে সাহায্য করে।

```javascript
// Nested ফিল্ড "address.city" আপডেট করুন
db.users.updateOne({ name: "Alice" }, { $set: { "address.city": "Chicago" } });

// একসাথে একাধিক ফিল্ড আপডেট করুন
db.users.updateOne({ name: "Alice" }, { $set: { city: "Boston", age: 30 } });
```

---

### **ডকুমেন্ট ডিলিট এবং কোলেকশন ড্রপ করা**

যখন আপনি ডকুমেন্ট বা কোলেকশন মুছতে চান, তখন এটি ব্যবহার করুন।

```javascript
// বয়স 50 এর বেশি এমন ইউজার ডিলিট করুন
db.users.deleteMany({ age: { $gt: 50 } });

// পুরো "users" কোলেকশন ড্রপ করুন
db.users.drop();
```

---

এই ছিল MongoDB এর কিছু সাধারণ অপারেটর এবং কুয়েরির ব্যবহার। MongoDB আপনাকে বিভিন্ন ধরনের ডেটা পরিচালনা ও ফিল্টার করার জন্য শক্তিশালী টুলস দেয়।

----
# MongoDB-এর Aggregation Framework :

বিভিন্ন ধাপে ডেটা সংগ্রহ, বিশ্লেষণ এবং পুনর্গঠন করার একটি শক্তিশালী টুল। এটি ব্যবহার করে আপনি ডেটা ফিল্টার করতে, গোষ্ঠীভুক্ত করতে, এবং রূপান্তর করতে পারবেন। এখানে আমরা একটি নমুনা ডকুমেন্ট এবং কিছু কমন Aggregation স্টেজ উদাহরণ হিসেবে ব্যবহার করছি।

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
  { $project: { name: 1, email: 1, occupation: 1, _id: 0 } },
]);
```

**উদ্দেশ্য**: ৩০ বছর বা তার বেশি বয়সের পুরুষদের তথ্য প্রদর্শন করবে, এবং শুধুমাত্র নাম, ইমেইল ও চাকরি তথ্য দেখাবে।

---

## ২. `$addFields`, `$out`, এবং `$merge` ব্যবহার করে নতুন ফিল্ড যোগ করা এবং আউটপুট করা

`$addFields` ডকুমেন্টে নতুন ফিল্ড যোগ করে। `$out` রেজাল্ট নতুন সংগ্রহে সংরক্ষণ করে।

### উদাহরণ:

```javascript
db.users.aggregate([
  {
    $addFields: {
      fullName: { $concat: ["$name.firstName", " ", "$name.lastName"] },
    },
  },
  { $out: "user_fullnames" },
]);
```

**উদ্দেশ্য**: `firstName` এবং `lastName` একত্রিত করে `fullName` ফিল্ড তৈরি করবে এবং নতুন `user_fullnames` সংগ্রহে সংরক্ষণ করবে।

---

## ৩. `$group`, `$sum`, এবং `$push` ব্যবহার করে গোষ্ঠীভুক্তকরণ ও অ্যারে তৈরি

`$group` নির্দিষ্ট ফিল্ড অনুযায়ী ডকুমেন্টগুলোকে গোষ্ঠীভুক্ত করে। `$sum` টোটাল গণনা করে।

### উদাহরণ:

```javascript
db.users.aggregate([
  {
    $group: {
      _id: "$occupation",
      avgSalary: { $avg: "$salary" },
      names: { $push: "$name.firstName" },
    },
  },
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
  { $group: { _id: "$skills.name", count: { $sum: 1 } } },
]);
```

**উদ্দেশ্য**: প্রতিটি স্কিলের জন্য গুনতি দেখাবে।

---

## ৫. `$bucket` এবং `$sort` দিয়ে তথ্য শ্রেণিবদ্ধকরণ

`$bucket` ফিল্ডের মান অনুযায়ী ডেটা শ্রেণিবদ্ধ করে এবং `$sort` আউটপুটকে সাজায়।

### উদাহরণ:

```javascript
db.users.aggregate([
  {
    $bucket: {
      groupBy: "$age",
      boundaries: [20, 30, 40, 50],
      output: { count: { $sum: 1 } },
    },
  },
  { $sort: { count: -1 } },
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
      "Top Skills": [
        { $unwind: "$skills" },
        { $group: { _id: "$skills.name", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ],
      "Avg Salary by Occupation": [
        { $group: { _id: "$occupation", avgSalary: { $avg: "$salary" } } },
      ],
    },
  },
]);
```

**উদ্দেশ্য**: একই সময়ে শীর্ষ স্কিল এবং প্রতিটি চাকরির গড় বেতন দেখাবে।

---

MongoDB-এর Aggregation Framework এবং উপরের টুলগুলো বিভিন্ন ডেটা ম্যানিপুলেশনে অত্যন্ত কার্যকর।

# Explain the solution of Task-1

এখানে প্রতিটি MongoDB কুয়েরি এবং তাদের ব্যাখ্যা দেওয়া হল:

---

### 1. **বয়স ৩০ এর বেশি এমন সকল ডকুমেন্ট খুঁজুন এবং শুধুমাত্র `name` এবং `email` ফিল্ড দেখান।**

```javascript
db.collection.find({ age: { $gt: 30 } }, { name: 1, email: 1, _id: 0 });
```

এখানে, `$gt: 30` ব্যবহার করা হয়েছে যেটি মানে হচ্ছে বয়স ৩০ এর বেশি হতে হবে। দ্বিতীয় প্যারামিটার `{ name: 1, email: 1, _id: 0 }` দিয়ে আমরা শুধু `name` এবং `email` ফিল্ড চাচ্ছি, `_id` বাদ দেওয়া হয়েছে।

---

### 2. **যেসব ডকুমেন্টে প্রিয় রং "Maroon" অথবা "Blue" তা খুঁজুন।**

```javascript
db.collection.find({ favoriteColor: { $in: ["Maroon", "Blue"] } });
```

এখানে, `$in` অপারেটর ব্যবহার করা হয়েছে যা চেক করবে যে `favoriteColor` এর মান "Maroon" অথবা "Blue" কিনা।

---

### 3. **যেসব ডকুমেন্টে `skills` অ্যারে খালি আছে তা খুঁজুন।**

```javascript
db.collection.find({ skills: { $size: 0 } });
```

এখানে, `$size: 0` ব্যবহার করা হয়েছে যাতে `skills` অ্যারের সাইজ ০ (খালি) হয়।

---

### 4. **যেসব ডকুমেন্টে "JavaScript" এবং "Java" দুইটি স্কিলই রয়েছে তা খুঁজুন।**

```javascript
db.collection.find({ "skills.name": { $all: ["JavaScript", "Java"] } });
```

এখানে, `$all` অপারেটর ব্যবহার করা হয়েছে যাতে `skills.name` ফিল্ডে "JavaScript" এবং "Java" দুইটি স্কিলই উপস্থিত থাকে।

---

### 5. **ইমেইল `"amccurry3@cnet.com"` এর জন্য একটি নতুন স্কিল অ্যারে তে যোগ করুন। স্কিল হলো `{"name": "Python", "level": "Beginner", "isLearning": true}`।**

#### প্রথমে, ডকুমেন্টটি ইনসার্ট করা (যদি না থাকে):

```javascript
db.collection.updateOne(
  { email: "amccurry3@cnet.com" },
  { $setOnInsert: { email: "amccurry3@cnet.com", skills: [] } },
  { upsert: true }
);
```

এখানে, `$setOnInsert` ব্যবহার করা হয়েছে যাতে যদি `"amccurry3@cnet.com"` এর জন্য কোন ডকুমেন্ট না থাকে তবে এটি নতুন ডকুমেন্ট হিসেবে যুক্ত হয় এবং `skills` অ্যারে খালি হবে।

#### তারপর, নতুন স্কিলটি অ্যারে তে যোগ করা:

```javascript
db.collection.updateOne(
  { email: "amccurry3@cnet.com" },
  { $push: { skills: { name: "Python", level: "Beginner", isLearning: true } } }
);
```

এখানে, `$push` ব্যবহার করা হয়েছে যাতে `skills` অ্যারে তে নতুন স্কিল যোগ করা যায়।

---

### 6. **"Spanish" নামক একটি নতুন ভাষা ভাষার তালিকায় যোগ করুন।**

```javascript
db.collection.updateMany({}, { $addToSet: { languages: "Spanish" } });
```

এখানে, `$addToSet` ব্যবহার করা হয়েছে যাতে `languages` অ্যারে তে "Spanish" ভাষা যদি আগে না থাকে তবে এটি যোগ করা হয়, কিন্তু যদি থাকে তবে সেটি আবার যোগ হবে না।

---

### 7. **`skills` অ্যারে থেকে "Kotlin" স্কিলটি সরান।**

```javascript
db.collection.updateMany({}, { $pull: { skills: { name: "Kotlin" } } });
```

এখানে, `$pull` ব্যবহার করা হয়েছে যাতে `skills` অ্যারে থেকে "Kotlin" স্কিলটি সরিয়ে ফেলা হয়।

---

এই কুয়েরিগুলি MongoDB ডাটাবেসে নির্দিষ্ট তথ্য অনুসন্ধান এবং আপডেটের জন্য ব্যবহৃত হয়, এবং প্রতিটি কুয়েরি তাদের উদ্দেশ্য এবং ব্যবহার বুঝিয়ে দেয়।

---

# Explain the solution of Task-2

এই সমস্যাগুলোর সমাধান MongoDB অ্যাগ্রিগেশন ফ্রেমওয়ার্ক ব্যবহার করে করা হয়েছে। নিচে প্রতিটি সমস্যার সমাধান বাংলায় বিস্তারিতভাবে ব্যাখ্যা করা হলো:

---

### 1. প্রতিটি লিঙ্গ অনুযায়ী সক্রিয় (`isActive: true`) ব্যক্তিদের সংখ্যা বের করা

```javascript
db.collection.aggregate([
  { $match: { isActive: true } }, // প্রথমে শুধুমাত্র সক্রিয় ব্যক্তিদের তথ্য বাছাই করা হচ্ছে
  {
    $group: {
      _id: "$gender", // প্রতিটি লিঙ্গ ভিত্তিতে গ্রুপিং করা হচ্ছে
      count: { $sum: 1 }, // প্রতিটি গ্রুপের জন্য সংখ্যা গণনা করা হচ্ছে
    },
  },
]);
```

**ব্যাখ্যা:** প্রথমে সক্রিয় ব্যক্তিদের বাছাই করার জন্য `$match` অপারেটর ব্যবহার করা হয়েছে। তারপর `$group` অপারেটর ব্যবহার করে প্রতিটি লিঙ্গের ভিত্তিতে গ্রুপ তৈরি করা হয়েছে এবং প্রতিটি গ্রুপের মোট সংখ্যা গণনা করা হয়েছে।

---

### 2. সক্রিয় (`isActive: true`) এবং প্রিয় ফল "banana" এমন ব্যক্তিদের নাম ও ইমেল ঠিকানা বের করা

```javascript
db.collection.aggregate([
  { $match: { isActive: true, favoriteFruit: "banana" } }, // সক্রিয় এবং প্রিয় ফল "banana" থাকা ব্যক্তিদের বাছাই
]);
```

**ব্যাখ্যা:** এখানে `$match` অপারেটরের মাধ্যমে শুধুমাত্র সক্রিয় এবং যাদের প্রিয় ফল "banana" রয়েছে এমন ব্যক্তিদের ফিল্টার করা হয়েছে।

---

### 3. প্রতিটি প্রিয় ফলের জন্য গড় বয়স নির্ণয় এবং গড় বয়সের ক্রমে ফলাফল অবতরণীমূলকভাবে সাজানো

```javascript
db.collection.aggregate([
  {
    $group: {
      _id: "$favoriteFruit", // প্রিয় ফলের ভিত্তিতে গ্রুপিং করা হচ্ছে
      averageAge: { $avg: "$age" }, // প্রতিটি গ্রুপের জন্য গড় বয়স নির্ণয়
    },
  },
  {
    $sort: { averageAge: -1 }, // গড় বয়স অনুযায়ী অবতরণীমূলকভাবে সাজানো
  },
]);
```

**ব্যাখ্যা:** `$group` অপারেটর ব্যবহার করে প্রতিটি প্রিয় ফলের জন্য গড় বয়স নির্ণয় করা হয়েছে এবং `$sort` অপারেটরের মাধ্যমে গড় বয়স অবতরণীমূলকভাবে সাজানো হয়েছে।

---

### 4. যাদের অন্তত একজন বন্ধু আছে এবং যাদের বন্ধুর নাম "W" অক্ষর দিয়ে শুরু তাদের বন্ধুর নামের একটি অনন্য তালিকা বের করা

```javascript
db.collection.aggregate([
  { $unwind: "$friends" }, // বন্ধুর তালিকা আলাদা ডকুমেন্টে বিভক্ত করা হচ্ছে
  {
    $match: {
      "friends.name": /^W/, // বন্ধুর নাম "W" দিয়ে শুরু এমনটি ফিল্টার করা হচ্ছে
    },
  },
  {
    $group: {
      _id: "$_id",
      uniqueFriends: { $addToSet: "$friends.name" }, // বন্ধুর নামের অনন্য তালিকা তৈরি করা হচ্ছে
    },
  },
]);
```

**ব্যাখ্যা:** `$unwind` অপারেটর বন্ধুর নামগুলো আলাদা ডকুমেন্টে বিভক্ত করছে, তারপর `$match` অপারেটর ব্যবহার করে বন্ধুর নামগুলো ফিল্টার করা হয়েছে, এবং `$group` অপারেটর ব্যবহার করে অনন্য বন্ধুর নামের তালিকা তৈরি করা হয়েছে।

---

### 5. বয়স অনুযায়ী দুটি ভাগে পৃথক করা (৩০ এর নিচে এবং ৩০ এর উপরে) এবং প্রতিটি ভাগে বয়সের সীমার মধ্যে গ্রুপিং ও বয়স অনুযায়ী সাজানো

```javascript
db.collection.aggregate([
  {
    $facet: {
      below30: [
        { $match: { age: { $lt: 30 } } }, // ৩০ এর নিচে বয়সের ব্যক্তিদের ফিল্টার করা
        {
          $bucket: {
            groupBy: "$age",
            boundaries: [20, 25, 30],
            default: "Other",
            output: {
              names: { $push: "$name" },
            },
          },
        },
      ],
      above30: [
        { $match: { age: { $gte: 30 } } }, // ৩০ এর উপরে বয়সের ব্যক্তিদের ফিল্টার করা
        {
          $bucket: {
            groupBy: "$age",
            boundaries: [30, 35, 40],
            default: "Other",
            output: {
              names: { $push: "$name" },
            },
          },
        },
      ],
    },
  },
]);
```

**ব্যাখ্যা:** এখানে `$facet` অপারেটর ব্যবহার করে দুটি ভিন্ন অংশে ডেটাকে ভাগ করা হয়েছে - `below30` এবং `above30`। প্রতিটি অংশে `$bucket` ব্যবহার করে বয়সের সীমার মধ্যে গ্রুপিং এবং `$push` এর মাধ্যমে নামের তালিকা তৈরি করা হয়েছে।

---

### 6. প্রতিটি কোম্পানির মোট ব্যালেন্স নির্ণয় এবং সর্বোচ্চ ব্যালেন্সযুক্ত শীর্ষ দুটি কোম্পানি প্রদর্শন করা

```javascript
db.collection.aggregate([
  {
    $group: {
      _id: "$company",
      totalBalance: { $sum: { $toDouble: { $substr: ["$balance", 1, -1] } } }, // ব্যালেন্সকে ডাবল টাইপে রূপান্তর করে যোগ করা হচ্ছে
    },
  },
  {
    $sort: { totalBalance: -1 }, // মোট ব্যালেন্স অবতরণীমূলকভাবে সাজানো
  },
  {
    $limit: 2, // শীর্ষ দুটি কোম্পানি সীমিত করা
  },
]);
```

**ব্যাখ্যা:** `$group` অপারেটরের মাধ্যমে প্রতিটি কোম্পানির মোট ব্যালেন্স গণনা করা হয়েছে। `$substr` এবং `$toDouble` ব্যবহার করে ব্যালেন্সকে সংখ্যায় রূপান্তর করা হয়েছে, তারপর `$sort` দিয়ে মোট ব্যালেন্স অবতরণীমূলকভাবে সাজানো এবং `$limit` দিয়ে শীর্ষ দুটি কোম্পানির ফলাফল সীমিত করা হয়েছে।

---

এই সমাধানগুলোর মাধ্যমে MongoDB অ্যাগ্রিগেশন ফ্রেমওয়ার্কের বিভিন্ন অপারেটরের ব্যবহার এবং তাদের কার্যকারিতা বোঝানো হয়েছে।
