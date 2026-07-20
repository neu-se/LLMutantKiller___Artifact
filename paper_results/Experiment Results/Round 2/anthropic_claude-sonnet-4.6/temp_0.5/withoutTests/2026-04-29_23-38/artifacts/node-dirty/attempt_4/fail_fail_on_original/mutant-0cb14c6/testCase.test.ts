import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('Dirty drain event after write stream drain', () => {
  it('should emit drain event when all writes complete and stream drains with inFlightWrites at 0', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    const db = new Dirty(dbPath);

    db.on('load', () => {
      const writeStream = (db as any)._writeStream;
      const origWrite = writeStream.write.bind(writeStream);
      let intercepting = true;

      // Force backpressure on first write, but queue should be empty when stream drains
      // (only one item in queue at a time)
      writeStream.write = function (data: any, cb: any) {
        origWrite(data, cb);
        if (intercepting) {
          intercepting = false;
          return false; // Signal backpressure
        }
        return true;
      };

      db.once('drain', () => {
        expect(db.get('key1')).toBe('value1');
        try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) { /* ignore */ }
        done();
      });

      // Only one set - so when stream drains, queue is empty and inFlightWrites===0
      db.set('key1', 'value1');
    });

    db.on('error', (err: Error) => {
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) { /* ignore */ }
      done(err);
    });
  }, 10000);
});