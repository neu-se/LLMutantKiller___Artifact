import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty', () => {
  it('should iterate over keys and apply function correctly', async () => {
    const db = new Dirty('test.db');
    await new Promise((resolve) => {
      db.on('load', () => {
        resolve();
      });
    });

    db.set('key1', 'value1', () => {});
    db.set('key2', 'value2', () => {});
    db.set('key3', 'value3', () => {});

    let count = 0;
    db.forEach((key: string, val: any) => {
      count++;
      if (key === 'key2') {
        return false; // should break the loop
      }
    });
    expect(count).toBe(2); // if the loop breaks, this will pass

    db.close();
  });
});