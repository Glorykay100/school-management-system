// In-memory data store — acts like our "database"
// Everything resets on server restart

const store = {
  users: [],
  students: [],
  teachers: [],
  classes: [],
  subjects: [],
  results: [],
};

// Simple ID generators
const nextId = (collection) =>
  collection.length ? Math.max(...collection.map((i) => i.id)) + 1 : 1;

module.exports = { store, nextId };