import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty close() with in-flight writes', () => {
  it('should complete all writes and emit write_close after drain when backpressure occurs', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    db.on('load', () => {
      const ws = (db as any)._writeStream;
      const origWrite = ws.write.bind(ws);
      
      // Force backpressure on first write: _waitForDrain=true, _inFlightWrites=1, _queue.size=0
      ws.write = (data: any, cb: any) => {
        ws.write = origWrite;
        origWrite(data, cb);
        return false; // backpressure
      };

      db.set('key1', 'value1');
      // State: _waitForDrain=true, _inFlightWrites=1, _queue.size=0
      
      // Original close(): _inFlightWrites>0 → waits → stream drain fires → _waitForDrain=false
      //   → write callback: _inFlightWrites=0 && !_waitForDrain → emits 'drain'
      //   → close() called again → ends stream → write_close
      //
      // Mutated close(): calls end() immediately
      //   → write callback fires: _inFlightWrites=0 but _waitForDrain still true → no 'drain' emitted
      //   → stream drain won't fire (stream ended) → write_close fires but drain never fired
      
      const order: string[] = [];
      db.on('drain', () => order.push('drain'));
      db.once('write_close', () => {
        order.push('write_close');
        try {
          // Original: drain fires before write_close
          // Mutated: write_close fires without drain
          expect(order).toContain('drain');
          expect(order.indexOf('drain')).toBeLessThan(order.indexOf('write_close'));
          fs.rmSync(tmpDir, { recursive: true, force: true });
          done();
        } catch (err) {
          fs.rmSync(tmpDir, { recursive: true, force: true });
          done(err);
        }
      });

      db.close();
    });

    db.on('error', (err) => {
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done(err);
    });
  }, 10000);
});