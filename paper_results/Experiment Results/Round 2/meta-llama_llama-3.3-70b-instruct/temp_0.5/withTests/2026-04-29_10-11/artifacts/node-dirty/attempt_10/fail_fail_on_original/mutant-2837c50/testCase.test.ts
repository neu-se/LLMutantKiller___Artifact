import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { promises as fsp } from 'fs';
import { join } from 'path';

describe('Dirty', () => {
  it('should close the database when the drain event is emitted', async () => {
    const filePath = join(__dirname, 'test.dirty');
    const db = new Dirty(filePath);
    db.set('key', 'value');
    await new Promise((resolve) => {
      db.on('drain', () => {
        db.close();
        resolve(true);
      });
    });
    await new Promise((resolve) => {
      db.on('write_close', () => {
        resolve(true);
      });
    });
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          db.set('key2', 'value2', (err: Error | null) => {
            if (err) {
              resolve(true);
            } else {
              reject(new Error('Database was not closed'));
            }
          });
        }, 100);
      });
    } catch (err: any) {
      expect(err.message).not.toBe('Database was not closed');
    }
  });
});