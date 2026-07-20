import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close() with in-flight writes', () => {
  it('should call the set() callback even when close() is called before drain', (done) => {
    const file = path.join(os.tmpdir(), `dirty-inflight-${process.pid}.dirty`);

    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);

    db.on('load', () => {
      let callbackFired = false;

      // set() with a callback - the callback should always be called
      db.set('key1', 'val1', (err: any) => {
        callbackFired = true;
        expect(err).toBeFalsy();
      });

      // Immediately call close() - _inFlightWrites > 0 at this point
      // Original: defers close until drain, so write completes and callback fires
      // Mutated: ends write stream immediately; write callback may never fire
      db.close();

      // Give time for callbacks to fire or not
      setTimeout(() => {
        expect(callbackFired).toBe(true);
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        done();
      }, 500);
    });
  });
});