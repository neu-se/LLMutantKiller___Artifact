import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close() correctly waits for in-flight writes', () => {
  it('should not close write stream before in-flight write completes, allowing data to be fully written', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-inflight-${process.pid}.dirty`);

    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);

    db.on('load', () => {
      // Write many keys to increase chance that _inFlightWrites > 0 when close() is called
      // and that the write stream is still processing when close() is invoked
      for (let i = 0; i < 100; i++) {
        db.set(`key${i}`, `value${i}`);
      }

      // Call close() - queue should be empty (flushed) but _inFlightWrites > 0
      // Original: waits for drain before closing
      // Mutated: closes immediately, potentially before all writes complete
      db.close();

      db.on('write_close', () => {
        // After write_close, verify ALL data was written to disk
        const contents = fs.readFileSync(file, 'utf-8');
        const lines = contents.trim().split('\n').filter((l: string) => l.length > 0);

        // All 100 keys should be written
        // In mutated code, stream may be ended prematurely, losing some writes
        expect(lines.length).toBe(100);

        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        done();
      });
    });
  });
});