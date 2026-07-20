import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('Dirty drain event after write stream drain', () => {
  it('should emit drain event when queue has items and inFlightWrites is exactly 0 on stream drain', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    const db = new Dirty(dbPath);

    db.on('load', () => {
      const writeStream = (db as any)._writeStream;
      const origWrite = writeStream.write.bind(writeStream);
      let firstWrite = true;

      // Intercept write: return false on first call to simulate backpressure
      // This causes _waitForDrain=true, stopping further flushes
      // Subsequent set() calls accumulate in the queue
      // When stream drain fires: _waitForDrain=false, queue has items, _inFlightWrites===0
      // Original (<=0): emits drain; Mutant (<0): does nothing, gets stuck
      writeStream.write = function (data: any, cb: any) {
        origWrite(data, cb);
        if (firstWrite) {
          firstWrite = false;
          return false; // Signal backpressure
        }
        return true;
      };

      db.once('drain', () => {
        expect(db.get('key1')).toBe('value1');
        expect(db.get('key2')).toBe('value2');
        expect(db.get('key3')).toBe('value3');
        try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) { /* ignore */ }
        done();
      });

      db.set('key1', 'value1');
      db.set('key2', 'value2');
      db.set('key3', 'value3');
    });

    db.on('error', (err: Error) => {
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) { /* ignore */ }
      done(err);
    });
  }, 10000);
});