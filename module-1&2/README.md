# Module2.1:In-Depth Exploration of MongoDB Queries

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


# Module2.2:Mastering MongoDB Aggregation & Indexing
