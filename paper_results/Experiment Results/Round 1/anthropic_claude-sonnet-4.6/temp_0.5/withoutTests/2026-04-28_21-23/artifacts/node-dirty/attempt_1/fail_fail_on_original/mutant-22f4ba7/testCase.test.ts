import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { rimraf } from 'rimraf';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty close with pending writes', () => {
  it('should wait for pending writes before closing and persist all data', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    try {
      await new Promise<void>((resolve, reject) => {
        const db = new Dirty(dbPath);
        
        db.on('load', () => {
          // Set multiple values to create pending writes
          let writeCount = 0;
          const totalWrites = 10;
          
          for (let i = 0; i < totalWrites; i++) {
            db.set(`key${i}`, { value: `data${i}`, index: i }, () => {
              writeCount++;
            });
          }
          
          // Call close immediately - original should wait for drain, mutant won't
          db.close();
          
          // Listen for write_close to know when everything is done
          db.on('write_close', () => {
            // Now reload the database and check all data was persisted
            const db2 = new Dirty(dbPath);
            db2.on('load', (count: number) => {
              try {
                // All 10 keys should be persisted
                expect(count).toBe(totalWrites);
                for (let i = 0; i < totalWrites; i++) {
                  const val = db2.get(`key${i}`);
                  expect(val).toEqual({ value: `data${i}`, index: i });
                }
                db2.close();
                resolve();
              } catch (err) {
                db2.close();
                reject(err);
              }
            });
            db2.on('error', reject);
          });
        });
        
        db.on('error', reject);
      });
    } finally {
      await rimraf(tmpDir);
    }
  });
});