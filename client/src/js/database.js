import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // Open the database
  const db = await openDB('jate', 1);
  // Add or update the content in the database
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const result = await store.put({ content });
  console.log('Data saved to the database:', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // Open the database
  const db = await openDB('jate', 1);
  // Get all entries from the object store
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const allContent = await store.getAll();
  console.log('Data retrieved from the database:', allContent);
  return allContent; // Return the retrieved content
};

initdb();
