Here are the MongoDB queries for each of the tasks provided:

---

### 1. Find all documents in the collection where the age is greater than 30 and only return the `name` and `email` fields.

```javascript
db.collection.find({ age: { $gt: 30 } }, { name: 1, email: 1, _id: 0 });
```

---

### 2. Find documents where the favorite color is either "Maroon" or "Blue."

```javascript
db.collection.find({ favoriteColor: { $in: ["Maroon", "Blue"] } });
```

---

### 3. Find all documents where the `skills` array is empty.

```javascript
db.collection.find({ skills: { $size: 0 } });
```

---

### 4. Find documents where the person has skills in both "JavaScript" and "Java."

```javascript
db.collection.find({ "skills.name": { $all: ["JavaScript", "Java"] } });
```

---

### 5. Add a new skill to the `skills` array for the document with the email `"amccurry3@cnet.com"`. The new skill is `{"name": "Python", "level": "Beginner", "isLearning": true}`.

#### First, insert the document if it does not exist.

```javascript
db.collection.updateOne(
  { email: "amccurry3@cnet.com" },
  { $setOnInsert: { email: "amccurry3@cnet.com", skills: [] } },
  { upsert: true }
);
```

#### Then, add the skill to the `skills` array.

```javascript
db.collection.updateOne(
  { email: "amccurry3@cnet.com" },
  { $push: { skills: { name: "Python", level: "Beginner", isLearning: true } } }
);
```

---

### 6. Add a new language `"Spanish"` to the list of languages spoken by the person.

```javascript
db.collection.updateMany({}, { $addToSet: { languages: "Spanish" } });
```

---

### 7. Remove the skill with the name `"Kotlin"` from the `skills` array.

```javascript
db.collection.updateMany({}, { $pull: { skills: { name: "Kotlin" } } });
```

---

Each of these queries addresses the specified task in MongoDB.
