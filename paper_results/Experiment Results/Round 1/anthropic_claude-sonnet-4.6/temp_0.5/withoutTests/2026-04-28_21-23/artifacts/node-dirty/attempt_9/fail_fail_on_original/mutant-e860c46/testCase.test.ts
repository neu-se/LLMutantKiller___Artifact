import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty close() with in-flight writes', () => {
  it('should properly close after all in-flight writes complete, not before', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    db.on('load', () => {
      const writeCbs: Array<() => void> = [];
      const ws = (db as any)._writeStream;
      const origWrite = ws.write.bind(ws);

      // Intercept write to capture callbacks, delaying their execution
      ws.write = (data: any, cb: any) => {
        writeCbs.push(cb);
        return true; // no backpressure
      };

      db.set('key1', 'value1');
      // Now: _queue.size=0, _inFlightWrites=1, write callback is held

      // Original: close() sees _inFlightWrites>0, registers once('drain', close), returns
      // Mutated: close() ignores _inFlightWrites, calls _writeStream.end() immediately
      db.close();

      // Now release the held write callback
      setImmediate(() => {
        // Restore original write
        ws.write = origWrite;
        // Fire the held callbacks
        for (const cb of writeCbs) cb(null);
      });

      db.once('write_close', () => {
        try {
          // In original: write callback fires -> drain emitted -> close() called -> end() -> write_close
          // In mutated: end() already called before callback fires
          // Check that all data was written
          const fileContent = fs.readFileSync(dbPath, 'utf-8');
          const lines = fileContent.trim().split('\n').filter(l => l.length > 0);
          expect(lines.length).toBe(1);
          const row = JSON.parse(lines[0]);
          expect(row.key).toBe('key1');
          expect(row.val).toBe('value1');
          fs.rmSync(tmpDir, { recursive: true, force: true });
          done();
        } catch (err) {
          fs.rmSync(tmpDir, { recursive: true, force: true });
          done(err);
        }
      });
    });

    db.on('error', (err) => {
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done(err);
    });
  }, 10000);
});