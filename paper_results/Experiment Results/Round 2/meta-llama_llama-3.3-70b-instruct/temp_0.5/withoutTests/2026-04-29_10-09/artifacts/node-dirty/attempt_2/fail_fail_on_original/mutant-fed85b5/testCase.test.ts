import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty', () => {
  it('should iterate over keys and apply function correctly', async () => {
    const db = new Dirty('test.db');
    await new Promise((resolve) => {
      db.on('load', () => {
        resolve();
      });
    });

    let count = 0;
    db.set('key1', 'value1', () => {});
    db.set('key2', 'value2', () => {});
    db.set('key3', 'value3', () => {});
    db.forEach((key, val) => {
      count++;
    });
    expect(count).toBe(3);

    db.forEach((key, val) => {
      if (key === 'key1') {
        return false; // should break the loop
      }
      count++;
    });
    expect(count).toBe(4); // if the loop doesn't break, this will fail

    db.close();
  });
});