import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty close() with in-flight writes', () => {
  it('should wait for drain before closing when _inFlightWrites > 0 and queue becomes empty mid-flush', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    db.on('load', () => {
      const ws = (db as any)._writeStream;
      const origWrite = ws.write.bind(ws);

      // On first write: actually write the data but return false (backpressure)
      // This sets _waitForDrain=true, _inFlightWrites=1, _queue.size=0
      // Then add more items to queue while waiting for drain
      ws.write = (data: any, cb: any) => {
        ws.write = origWrite; // restore for subsequent writes
        const result = origWrite(data, cb);
        // Force backpressure regardless of actual result
        return false;
      };

      db.set('key1', 'value1');
      // _waitForDrain=true, _inFlightWrites=1, _queue.size=0

      // Add more items while in backpressure state - they go to queue
      db.set('key2', 'value2');
      db.set('key3', 'value3');
      // _queue.size=2

      // Now close() - both versions see _queue.size>0, so both wait for drain
      // When stream drain fires: _waitForDrain=false, _flush() called
      // _flush() writes key2, key3 -> _queue.size=0, _inFlightWrites=2 (or 3 with key1 still)
      // Then close() called again via drain listener:
      //   Original: _inFlightWrites>0 -> waits again
      //   Mutated: _queue.size=0 -> proceeds to end() immediately
      // If end() called while key2/key3 writes in flight, their callbacks still fire
      // but the stream drain event won't fire again
      // The write callbacks: _inFlightWrites-- -> if 0 && !_waitForDrain -> emit drain
      // In mutated: end() called, writes complete, callbacks fire, drain emits
      // Hmm, this might still work...

      db.close();

      db.once('write_close', () => {
        try {
          const fileContent = fs.readFileSync(dbPath, 'utf-8');
          const lines = fileContent.trim().split('\n').filter(l => l.length > 0);
          expect(lines.length).toBe(3);
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