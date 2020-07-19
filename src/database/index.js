import Dexie from 'dexie';

const db = new Dexie('UmbraPlanDB');

db.version(1).stores({
  boxes: '++id, &name',
  plans: `
    ++id,
    do,
    status,
    time.ddl,
    time.due,
    *tags`,
  tags: '++id, &name',
});

export default db;