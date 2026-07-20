import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { rimraf } from 'rimraf';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty flush backpressure handling', () => {
  it('should write all queued items and emit drain even when waitForDrain is set', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Set many keys rapidly to trigger backpressure scenario
      // The mutation causes _flush to NOT return early when queue is non-empty but waitForDrain=false
      // But when waitForDrain=true and queue has items, original returns early, mutation continues
      let drainCount = 0;
      
      db.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          // After drain, verify all data was written correctly
          const db2 = new Dirty(dbPath);
          db2.on('load', (count) => {
            try {
              expect(count).toBe(3);
              expect(db2.get('key1')).toBe('value1');
              expect(db2.get('key2')).toBe('value2');
              expect(db2.get('key3')).toBe('value3');
              db2.close();
              rimraf(tmpDir).then(() => done()).catch(done);
            } catch (err) {
              rimraf(tmpDir).then(() => done(err)).catch(done);
            }
          });
        }
      });

      // Set multiple keys - this exercises the flush logic
      db.set('key1', 'value1');
      db.set('key2', 'value2');
      db.set('key3', 'value3', () => {
        db.close();
      });
    });

    db.on('error', (err) => {
      rimraf(tmpDir).then(() => done(err)).catch(done);
    });
  });
});