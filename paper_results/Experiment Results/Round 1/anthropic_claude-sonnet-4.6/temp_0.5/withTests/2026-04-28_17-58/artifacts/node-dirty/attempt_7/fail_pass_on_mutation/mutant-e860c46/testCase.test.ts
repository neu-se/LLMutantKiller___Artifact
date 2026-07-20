import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close() waits for in-flight writes', () => {
  it('should emit drain before write_close', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-inflight-${process.pid}.dirty`);

    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);
    const eventOrder: string[] = [];

    db.on('load', () => {
      db.once('drain', () => {
        eventOrder.push('drain');
      });

      db.once('write_close', () => {
        eventOrder.push('write_close');
        // Original: drain fires first (write completes, then close() re-called from drain handler)
        // Mutated: write_close may fire before drain because end() called immediately
        expect(eventOrder[0]).toBe('drain');
        expect(eventOrder[1]).toBe('write_close');
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        done();
      });

      db.set('key1', 'value1');
      // _flush has run: _queue.size=0, _inFlightWrites=1
      db.close();
    });
  });
});