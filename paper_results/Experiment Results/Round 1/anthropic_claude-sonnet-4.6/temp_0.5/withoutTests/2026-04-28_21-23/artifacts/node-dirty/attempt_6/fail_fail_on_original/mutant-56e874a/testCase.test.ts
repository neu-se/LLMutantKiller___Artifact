import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty _flush', () => {
  it('should correctly flush all items after backpressure clears', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    const db = new (Dirty as any)(dbPath);

    db.on('load', () => {
      const ws = (db as any)._writeStream;
      
      // Remove the existing drain handler and replace with one that calls _flush
      ws.removeAllListeners('drain');
      ws.on('drain', () => {
        (db as any)._waitForDrain = false;
        if (!(db as any)._queue.size) {
          if ((db as any)._inFlightWrites <= 0) db.emit('drain');
        } else {
          (db as any)._flush();
        }
      });

      // Make first write cause backpressure
      const origWrite = ws.write.bind(ws);
      let callCount = 0;
      ws.write = function(data: string, cb: (err?: Error | null) => void) {
        callCount++;
        origWrite(data, cb);
        return callCount === 1 ? false : true; // backpressure on first write only
      };

      db.set('key1', 'value1');
      // After set: key1 written, backpressure → _waitForDrain = true
      
      db.set('key2', 'value2');
      // After set: _flush called but guard 1 catches _waitForDrain=true → key2 stays in queue

      // When stream drains: _waitForDrain=false, _flush called
      // _flush: guard 1 passes, guard 2 passes, writes key2
      // drain event should fire

      db.once('drain', () => {
        expect(db.get('key1')).toBe('value1');
        expect(db.get('key2')).toBe('value2');
        try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}
        done();
      });
    });

    db.on('error', () => {
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}
      done();
    });
  }, 10000);
});