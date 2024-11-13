# Module-2.1:In-Depth Exploration of MongoDB Queries

---

## MongoDB Basics: A Beginner-Friendly Guide to Common Operators

MongoDB is a powerful, flexible NoSQL database that lets you work with JSON-like documents. Whether you're managing data for a simple app or a complex project, MongoDB has you covered. Here’s a breakdown of common commands and operators to help you get started.

---

### Basic CRUD Operations and Projection

CRUD stands for **Create, Read, Update, and Delete**. Here’s how MongoDB handles each of these operations:

#### Insert Documents: `insertOne` and `insertMany`

Adding data to a MongoDB collection is simple. You can add a single document with `insertOne` or multiple documents at once with `insertMany`.

```javascript
// Insert a single document
db.users.insertOne({ name: "Alice", age: 28, city: "New York" });

// Insert multiple documents
db.users.insertMany([
  { name: "Bob", age: 35, city: "San Francisco" },
  { name: "Charlie", age: 40, city: "Los Angeles" },
]);
```

#### Retrieve Documents: `find` and `findOne` with Field Filtering

Use `find` to get multiple documents that match a query or `findOne` to fetch a single document. You can also limit which fields to show using projection.

```javascript
// Find all users in "New York" and show only the "name" field
db.users.find({ city: "New York" }, { name: 1, _id: 0 });

// Find a single user by name and only show "name" and "age"
db.users.findOne({ name: "Alice" }, { name: 1, age: 1, _id: 0 });
```

---

### Comparison Operators: Filtering Data with Conditions

MongoDB’s comparison operators help you match specific conditions in your queries.

#### Common Comparison Operators: `$eq`, `$ne`, `$gt`, `$lt`, `$gte`, `$lte`

- `$eq` for "equal to"
- `$ne` for "not equal to"
- `$gt` for "greater than"
- `$lt` for "less than"
- `$gte` for "greater than or equal to"
- `$lte` for "less than or equal to"

```javascript
// Find users with age equal to 28
db.users.find({ age: { $eq: 28 } });

// Find users with age not equal to 28
db.users.find({ age: { $ne: 28 } });

// Find users with age greater than 30
db.users.find({ age: { $gt: 30 } });

// Find users with age less than 35
db.users.find({ age: { $lt: 35 } });
```

---

### Inclusion Operators: `$in` and `$nin`

These operators let you match documents where a field's value is either inside or outside a specific list of values.

```javascript
// Find users in either "New York" or "San Francisco"
db.users.find({ city: { $in: ["New York", "San Francisco"] } });

// Find users not in "Los Angeles" or "San Francisco"
db.users.find({ city: { $nin: ["Los Angeles", "San Francisco"] } });
```

---

### Logical Operators: Combining Conditions with `$and` and `$or`

Logical operators help you create more complex queries by combining multiple conditions.

```javascript
// Find users with age above 30 AND city "New York"
db.users.find({ $and: [{ age: { $gt: 30 } }, { city: "New York" }] });

// Find users with age below 30 OR city "Los Angeles"
db.users.find({ $or: [{ age: { $lt: 30 } }, { city: "Los Angeles" }] });
```

---

### Data Inspection Operators: `$exists`, `$type`, and `$size`

These operators let you check for specific field conditions, such as existence, data type, and array size.

```javascript
// Find users where "city" field exists
db.users.find({ city: { $exists: true } });

// Find users where "age" is of type "number"
db.users.find({ age: { $type: "number" } });

// Find users with a "tags" array of exactly 3 elements
db.users.find({ tags: { $size: 3 } });
```

---

### Array Operators: `$all` and `$elemMatch`

These operators are useful when working with arrays.

- `$all` ensures that all specified elements are present in an array.
- `$elemMatch` matches documents where at least one array element meets the specified criteria.

```javascript
// Find users with tags "developer" and "javascript"
db.users.find({ tags: { $all: ["developer", "javascript"] } });

// Find users with experience where at least one entry has 2+ years at "TechCorp"
db.users.find({
  experience: { $elemMatch: { company: "TechCorp", years: { $gte: 2 } } },
});
```

---

### Updating Documents: `$set`, `$addToSet`, `$push`

When you want to update your documents, these operators come in handy.

```javascript
// Update the city for "Alice" to "Chicago"
db.users.updateOne({ name: "Alice" }, { $set: { city: "Chicago" } });

// Add a unique tag to the tags array
db.users.updateOne({ name: "Alice" }, { $addToSet: { tags: "backend" } });

// Add a skill to the skills array (without checking for uniqueness)
db.users.updateOne({ name: "Alice" }, { $push: { skills: "MongoDB" } });
```

---

### Removing Fields or Array Elements: `$unset`, `$pop`, `$pull`, `$pullAll`

These operators help you delete fields and array elements from your documents.

```javascript
// Remove the "city" field from the document
db.users.updateOne({ name: "Alice" }, { $unset: { city: "" } });

// Remove the last element from the "skills" array
db.users.updateOne({ name: "Alice" }, { $pop: { skills: 1 } });

// Remove all instances of "Node.js" from the skills array
db.users.updateOne({ name: "Alice" }, { $pull: { skills: "Node.js" } });

// Remove all specified elements from an array
db.users.updateOne(
  { name: "Alice" },
  { $pullAll: { skills: ["MongoDB", "Express"] } }
);
```

---

### Advanced Usage of `$set`

The `$set` operator can also update nested fields or create fields if they don’t exist.

```javascript
// Set a nested field "address.city" to "Chicago"
db.users.updateOne({ name: "Alice" }, { $set: { "address.city": "Chicago" } });

// Set multiple fields at once
db.users.updateOne({ name: "Alice" }, { $set: { city: "Boston", age: 30 } });
```

---

### Deleting Documents and Dropping Collections

When you need to delete documents or entire collections, here’s how.

```javascript
// Delete a user with age above 50
db.users.deleteMany({ age: { $gt: 50 } });

// Drop the entire "users" collection
db.users.drop();
```

---

# Module-2.2:Mastering MongoDB Aggregation & Indexing

---

## MongoDB Aggregation: A Powerful Tool for Data Analysis

MongoDB aggregation is a powerful tool for analyzing and manipulating data. It allows you to perform complex operations on your data, such as grouping, filtering, and sorting. With aggregation, you can extract valuable insights from your data and make informed decisions.

### Basic Aggregation Operations

MongoDB provides several aggregation operators that you can use to perform common data analysis tasks. Here are some of the most commonly used ones:

- `$group`: Groups documents based on specified criteria and applies an aggregation function to each group.
- `$match`: Filters documents based on specified criteria.
- `$sort`: Sorts documents based on specified criteria.
- `$limit`: Limits the number of documents returned.
- `$skip`: Skips the specified number of documents.

### Grouping Documents with `$group`

The `$group` operator is used to group documents based on specified criteria. It applies an aggregation function to each group and returns the result.

```javascript
// Group documents by "city" and calculate the average "age" for each group
db.users.aggregate([{ $group: { _id: "$city", avgAge: { $avg: "$age" } } }]);
```

### Filtering Documents with `$match`

The `$match` operator is used to filter documents based on specified criteria. It returns only the documents that match the specified conditions.

```javascript
// Find users with age greater than 30
db.users.aggregate([{ $match: { age: { $gt: 30 } } }]);
```

### Sorting Documents with `$sort`

The `$sort` operator is used to sort documents based on specified criteria. It returns the documents sorted in ascending or descending order.

```javascript
// Sort users by age in ascending order
db.users.aggregate([{ $sort: { age: 1 } }]);

// Sort users by age in descending order
db.users.aggregate([{ $sort: { age: -1 } }]);
```

### Limiting the Number of Documents with `$limit`

The `$limit` operator is used to limit the number of documents returned. It returns only the specified number of documents.

```javascript
// Return the first 10 users
db.users.aggregate([{ $limit: 10 }]);
```

### Skipping the First N Documents with `$skip`

The `$skip` operator is used to skip the specified number of documents. It returns the remaining documents after skipping the specified number of documents.

```javascript
// Skip the first 10 users
db.users.aggregate([{ $skip: 10 }]);
```

---

### Advanced Aggregation Techniques

In addition to the basic aggregation operators, MongoDB provides several advanced techniques that you can use to perform more complex data analysis tasks.

- `$lookup`: Joins two collections based on a specified field and returns the result.
- `$unwind`: Deconstructs an array field and returns the result.
- `$facet`: Groups documents based on specified criteria and applies an aggregation function to each group.
- `$out`: Outputs the aggregation result to a new collection.

### Joining Collections with `$lookup`

The `$lookup` operator is used to join two collections based on a specified field and returns the result. It allows you to perform complex data analysis tasks by combining data from multiple collections.

```javascript
// Join the "users" and "posts" collections based on the "userId" field
db.users.aggregate([
  {
    $lookup: {
      from: "posts",
      localField: "userId",
      foreignField: "userId",
      as: "posts",
    },
  },
]);
```

### Deconstructing Arrays with `$unwind`

The `$unwind` operator is used to deconstruct an array field and returns the result. It allows you to extract individual elements from an array and perform further operations on them.

```javascript
// Deconstruct the "tags" array and return the individual elements
db.users.aggregate([{ $unwind: "$tags" }]);
```

### Grouping Documents with `$facet`

The `$facet` operator is used to group documents based on specified criteria and applies an aggregation function to each group. It allows you to perform complex data analysis tasks by combining data from multiple collections.

```javascript
// Group documents by "city" and calculate the average "age" for each group
db.users.aggregate([
  {
    $facet: {
      avgAge: [{ $group: { _id: "$city", avgAge: { $avg: "$age" } } }],
    },
  },
]);
```

### Outputting the Aggregation Result with `$out`

The `$out` operator is used to output the aggregation result to a new collection. It allows you to store the result of an aggregation operation for later use or analysis.

```javascript
// Output the aggregation result to a new collection
db.users.aggregate([{ $out: "aggregatedUsers" }]);
```

---

## Indexing in MongoDB: Improving Query Performance

MongoDB indexes are used to improve query performance by allowing the database to quickly locate the documents that match a query. Indexes can be created on specific fields or combinations of fields.

### Types of Indexes

MongoDB supports several types of indexes, including:

- Single Field Index: A single field index is used to create a unique index on a single field.
- Compound Index: A compound index is used to create a unique index on multiple fields.
- Text Index: A text index is used to create a text index on a field.
- Geospatial Index: A geospatial index is used to create a geospatial index on a field.

### Creating Indexes

To create an index, you can use the `createIndex` method in the MongoDB shell or the `createIndexes` method in the MongoDB driver. Here's an example of creating a single field index:

```javascript
// Create a single field index on the "name" field
db.users.createIndex({ name: 1 });
```

### Querying with Indexes

To query a collection with an index, you can use the `find` method with the `hint` option. Here's an example of querying a collection with a single field index:

```javascript
// Query the "users" collection with a single field index on the "name" field
db.users.find({ name: "Alice" }).hint({ name: 1 });
```

### Querying with Multiple Indexes

To query a collection with multiple indexes, you can use the `find` method with the `hint` option. Here's an example of querying a collection with a compound index on the "name" and "age" fields:

```javascript
// Query the "users" collection with a compound index on the "name" and "age" fields
db.users.find({ name: "Alice", age: 30 }).hint({ name: 1, age: 1 });
```

---

This guide covers the essentials of MongoDB operators, giving you the flexibility to manage and manipulate data effectively.

---

# :::::::::::::::::::NOTE:::::::::::::::

## MongoDB Aggregation Framework with Sample Document

We'll explore different aggregation stages to manipulate and analyze the data effectively. Here’s a breakdown of our aggregation journey with this document.

---

#### Sample Document

The document we’ll use as a basis for our aggregations contains fields like name, email, address, occupation, skills, friends, interests, and more. Here's an example of the document structure we’ll use:

```json
{
    "_id": ObjectId("6406ad63fc13ae5a40000067"),
    "name": { "firstName": "Ahmad", "lastName": "McCurry" },
    "email": "amccurry3@cnet.com",
    "phone": "(691) 1462054",
    "gender": "Male",
    "age": 38,
    "birthday": "9/7/2022",
    "address": { "street": "54 Shasta Center", "city": "Qandala", "country": "Somalia" },
    "company": "Babbleblab",
    "favoutiteColor": "Maroon",
    "friends": [ "Mir Hussain", "Abdur Rakib", "Najmus Sakib", "Rasel Ahmed" ],
    "occupation": "Research Associate",
    "interests": [ "Writing", "Gardening", "Travelling" ],
    "skills": [
        { "name": "JAVASCRIPT", "level": "Expert", "isLearning": true },
        { "name": "KOTLIN", "level": "Expert", "isLearning": false },
        { "name": "JAVA", "level": "Intermediate", "isLearning": true }
    ],
    "education": [
        {
            "degree": "Bachelor of Science",
            "major": "Education",
            "institute": "Institute of Teachers Education, Technical Education",
            "year": 2009
        }
    ],
    "languages": [ "Telugu", "Malagasy", "Yiddish" ],
    "ipAddress": "193.40.242.96",
    "salary": 301,
    "course": "Level-2",
    "eduTech": "Programming Hero"
}
```

---

### 1. Filtering and Selecting Fields with `$match` and `$project`

The `$match` stage filters documents based on specific conditions, similar to a "WHERE" clause in SQL. The `$project` stage reshapes documents by including or excluding specific fields.

#### Example:

```javascript
db.users.aggregate([
  { $match: { gender: "Male", age: { $gte: 30 } } },
  { $project: { name: 1, email: 1, occupation: 1, _id: 0 } },
]);
```

- **Purpose**: Filters for male users aged 30 or above and returns only their name, email, and occupation.

---

### 2. Adding Fields and Outputting Results with `$addFields`, `$out`, and `$merge`

- **`$addFields`** allows us to add new fields to documents.
- **`$out`** outputs results to a new collection.
- **`$merge`** merges results with an existing collection.

#### Example:

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

- **Purpose**: Adds a `fullName` field by concatenating `firstName` and `lastName`, and saves the result in a new collection `user_fullnames`.

---

### 3. Grouping, Summing, and Collecting Arrays with `$group`, `$sum`, and `$push`

- **`$group`** groups documents by a specified field.
- **`$sum`** calculates the total of a field within each group.
- **`$push`** creates arrays of values within each group.

#### Example:

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

- **Purpose**: Groups users by occupation, calculates the average salary for each occupation, and lists the first names of users in each group.

---

### 4. Advanced Reshaping with `$group` and `$project`

Use `$group` and `$project` together to perform complex aggregations and select specific fields or structures.

#### Example:

```javascript
db.users.aggregate([
  {
    $group: {
      _id: "$address.country",
      totalUsers: { $sum: 1 },
      avgAge: { $avg: "$age" },
    },
  },
  { $project: { country: "$_id", totalUsers: 1, avgAge: 1, _id: 0 } },
]);
```

- **Purpose**: Groups users by country, counts users per country, calculates the average age, and reshapes the output.

---

### 5. Working with Arrays using `$group` and `$unwind`

**`$unwind`** breaks apart arrays into individual documents, allowing for easier aggregation.

#### Example:

```javascript
db.users.aggregate([
  { $unwind: "$skills" },
  { $group: { _id: "$skills.name", count: { $sum: 1 } } },
]);
```

- **Purpose**: Counts how many users have each skill, even if they have multiple skills listed.

---

### 6. Categorizing and Sorting Data with `$bucket`, `$sort`, and `$limit`

- **`$bucket`** categorizes data into ranges.
- **`$sort`** orders results.
- **`$limit`** restricts output to a specified number.

#### Example:

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
  { $limit: 3 },
]);
```

- **Purpose**: Categorizes users by age range, sorts by count, and limits output to the top 3 age groups.

---

### 7. Multi-Pipeline Aggregations with `$facet`

**`$facet`** enables running multiple aggregation pipelines in a single stage, useful for multiple analyses on the same dataset.

#### Example:

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

- **Purpose**: Simultaneously finds the top skills and calculates the average salary by occupation.

---

### 8. Data Linking with `$lookup` (Joins Between Collections)

**`$lookup`** performs a left outer join, combining related data from different collections.

#### Example:

```javascript
db.users.aggregate([
  {
    $lookup: {
      from: "courses",
      localField: "course",
      foreignField: "courseName",
      as: "courseDetails",
    },
  },
]);
```

- **Purpose**: Links users to details in a `courses` collection where `course` matches `courseName`.

---

### 9. Indexing for Performance Optimization

Indexing speeds up queries by reducing the time MongoDB needs to scan documents.

#### Example:

```javascript
db.users.createIndex({ email: 1 });
```

- **Purpose**: Creates an index on the `email` field for faster searches.

---

### 10. Compound and Text Indexes

- **Compound Index**: Multiple fields are indexed to enhance efficiency for multi-field queries.
- **Text Index**: Enables efficient text searching.

#### Example:

```javascript
db.users.createIndex({ name: "text", occupation: "text" });
```

- **Purpose**: Creates a text index for full-text searching on `name` and `occupation`.

---
