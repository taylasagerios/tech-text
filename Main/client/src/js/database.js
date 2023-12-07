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

  export const putDb = async (content) => {
    console.log('PUT to the database');
    const todosDb = await openDB('todos', 1);
    const tx = todosDb.transaction('todos', 'readwrite');
    const store = tx.objectStore('todos');
    const request = store.put({ id: id, todo: content });
    const result = await request;
    console.log('Data saved to the database', result);
  };
;

export const getDb = async () => {
  console.log('GET from the database');

  const contactDb = await openDB('jate', 1);

  const tx = contactDb.transaction('jate', 'readonly');

  const store = tx.objectStore('jate');

  const request = store.getAll();

  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
