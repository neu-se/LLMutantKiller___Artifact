import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

describe('Dirty close with pending writes', () => {
  it('should wait for drain before closing when there are pending writes, persisting all data', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    try {
      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Test timed out'));
        }, 5000);

        const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
        const db = new Dirty(dbPath);

        db.on('load', () => {
          // Queue up multiple writes
          for (let i = 0; i < 20; i++) {
            db.set(`key${i}`, { value: `data${i}`, index: i });
          }

          // Call close immediately while writes are pending
          // Original: waits for drain before actually closing
          // Mutated: closes immediately, losing pending writes
          db.close();

          db.on('write_close', () => {
            clearTimeout(timeout);

            // Reload the database and verify all data was persisted
            const db2 = new Dirty(dbPath);
            db2.on('load', (count: number) => {
              try {
                expect(count).toBe(20);
                for (let i = 0; i < 20; i++) {
                  expect(db2.get(`key${i}`)).toEqual({ value: `data${i}`, index: i });
                }
                db2.close();
                resolve();
              } catch (err) {
                db2.close();
                reject(err);
              }
            });
            db2.on('error', (err: Error) => reject(err));
          });
        });

        db.on('error', (err: Error) => {
          clearTimeout(timeout);
          reject(err);
        });
      });
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });
});