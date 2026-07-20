import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close() waits for in-flight writes', () => {
  it('should call set callback before write_close when close is called immediately after set', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-inflight-${process.pid}.dirty`);

    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);
    const events: string[] = [];

    db.on('load', () => {
      // set with a callback - this callback must fire before write_close
      // because close() should wait for in-flight writes to complete
      db.set('testKey', 'testValue', (err: Error | null) => {
        events.push('setCallback');
        expect(err).toBeNull();
      });

      // Call close() right after set - queue is now empty (_flush was called)
      // but _inFlightWrites > 0
      // Original: waits for drain (which fires after write callback), then closes
      // Mutated: immediately closes the write stream, write callback may get error
      db.close();

      db.on('write_close', () => {
        // The set callback must have fired before write_close
        expect(events).toContain('setCallback');
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        done();
      });
    });
  });
});