import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('write stream drain behavior', () => {
  const testFile = path.join(__dirname, 'test-drain.dirty');
  let db: any;

  beforeEach(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  afterEach(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  it('should properly flush pending writes after drain', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Set multiple values to fill the write buffer
      for (let i = 0; i < 100; i++) {
        db.set(`key${i}`, `value${i}`);
      }

      let drainCount = 0;
      db.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          // At this point, the write stream has drained
          // The original code should call _flush() to process any remaining items
          // The mutated code won't call _flush()
          // We'll verify by checking if all data was written
          setImmediate(() => {
            fs.readFile(testFile, 'utf8', (err, data) => {
              if (err) return done(err);
              const lines = data.trim().split('\n');
              if (lines.length === 100) {
                done();
              } else {
                done(new Error(`Expected 100 lines but got ${lines.length}`));
              }
            });
          });
        }
      });
    });
  });
});