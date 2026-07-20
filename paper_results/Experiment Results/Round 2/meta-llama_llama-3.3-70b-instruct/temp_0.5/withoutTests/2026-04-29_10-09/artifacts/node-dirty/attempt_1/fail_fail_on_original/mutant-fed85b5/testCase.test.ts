import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import { rimraf } from 'rimraf';

describe('Dirty', () => {
  it('should iterate over keys and apply function correctly', async () => {
    const db = new Dirty('test.db');
    await new Promise((resolve) => {
      db.on('load', () => {
        db.set('key1', 'value1', () => {
          db.set('key2', 'value2', () => {
            db.set('key3', 'value3', () => {
              resolve();
            });
          });
        });
      });
    });

    let count = 0;
    db.forEach((key, val) => {
      count++;
    });
    expect(count).toBe(3);

    await new Promise((resolve) => {
      db.on('drain', () => {
        rimraf('test.db', () => {
          resolve();
        });
      });
      db.close();
    });
  });
});