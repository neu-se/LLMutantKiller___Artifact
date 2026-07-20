import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { rimraf } from 'rimraf';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain behavior', () => {
  it('should flush all queued items after a drain event, not just the first batch', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Write a large number of entries to try to trigger backpressure
      // We need to queue up many writes so that when drain fires, there are still items in the queue
      const totalWrites = 1000;
      let completedWrites = 0;
      const errors: Error[] = [];

      const checkDone = () => {
        completedWrites++;
        if (completedWrites === totalWrites) {
          // All writes completed - verify all data is in memory
          let allPresent = true;
          for (let i = 0; i < totalWrites; i++) {
            if (db.get(`key${i}`) !== i) {
              allPresent = false;
              break;
            }
          }

          db.close();
          db.on('write_close', () => {
            // Verify the file contains all the written data
            const content = fs.readFileSync(dbPath, 'utf-8');
            const lines = content.trim().split('\n').filter(l => l.length > 0);
            
            rimraf(tmpDir).then(() => {
              if (errors.length > 0) {
                done(errors[0]);
                return;
              }
              if (!allPresent) {
                done(new Error('Not all keys were present in memory'));
                return;
              }
              // With mutation, some writes after drain may not be flushed
              // so the file might have fewer lines than expected
              try {
                expect(lines.length).toBeGreaterThanOrEqual(totalWrites);
                done();
              } catch (e) {
                done(e);
              }
            });
          });
        }
      };

      // Write all entries rapidly to trigger potential backpressure
      for (let i = 0; i < totalWrites; i++) {
        db.set(`key${i}`, i, (err?: Error) => {
          if (err) errors.push(err);
          checkDone();
        });
      }
    });

    db.on('error', (err: Error) => {
      // ignore ENOENT on first load
    });
  });
});