import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close() waits for in-flight writes before closing', () => {
  it('should emit drain before write_close when close is called while writes are in-flight', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-inflight-${process.pid}.dirty`);

    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);
    const events: string[] = [];

    db.on('load', () => {
      db.on('drain', () => {
        events.push('drain');
      });

      db.on('write_close', () => {
        events.push('write_close');

        // In original code: drain fires first (waited for in-flight writes)
        // In mutated code: write_close may fire without drain having fired first
        expect(events).toContain('drain');
        expect(events.indexOf('drain')).toBeLessThan(events.indexOf('write_close'));

        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        done();
      });

      // Trigger a write - this increments _inFlightWrites and empties the queue
      db.set('testKey', 'testValue');

      // Call close() immediately after set - at this point the queue has been
      // flushed (_queue.size === 0) but _inFlightWrites > 0 (write callback pending)
      // Original: detects _inFlightWrites > 0, waits for drain event
      // Mutated: only checks _queue.size (which is 0), proceeds to close immediately
      db.close();
    });
  });
});