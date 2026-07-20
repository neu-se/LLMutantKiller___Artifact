import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('flush loop mutation detection', () => {
  it('should process multiple queued keys when _waitForDrain was true', (done) => {
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const tmpFile = path.join(os.tmpdir(), `dirty-test-mutant-${process.pid}-${Date.now()}.dirty`);

    const db = new Dirty(tmpFile);

    db.on('load', () => {
      let corkCount = 0;
      const originalCork = db._writeStream.cork.bind(db._writeStream);
      db._writeStream.cork = () => { corkCount++; return originalCork(); };

      // Write large data to force _waitForDrain = true
      const largeVal = 'x'.repeat(65536); // exceed highWaterMark
      
      db.set('key0', largeVal); // This should fill buffer, _waitForDrain=true
      
      // Now queue multiple keys while _waitForDrain is true
      db.set('key1', 'v1');
      db.set('key2', 'v2');
      db.set('key3', 'v3');

      const startCorkCount = corkCount; // should be 1 after key0

      let allDone = false;
      let callbackCount = 0;

      ['key1', 'key2', 'key3'].forEach(k => {
        db.set(k, db.get(k), () => {
          callbackCount++;
          if (callbackCount === 3 && !allDone) {
            allDone = true;
            setImmediate(() => {
              try {
                // After key0 drains, _flush() should process key1,key2,key3 in ONE call (original)
                // or THREE calls (mutated)
                // corkCount after key0: startCorkCount
                // original: startCorkCount + 1 more cork for all 3 remaining keys
                // mutated: startCorkCount + 3 more corks (one per key)
                const additionalCorks = corkCount - startCorkCount;
                expect(additionalCorks).toBe(1);
                db.close();
                db.on('write_close', () => {
                  try { fs.unlinkSync(tmpFile); } catch (e) { /* ignore */ }
                  done();
                });
              } catch (e) {
                try { fs.unlinkSync(tmpFile); } catch (err) { /* ignore */ }
                done(e as Error);
              }
            });
          }
        });
      });
    });
  });
});