import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty close', () => {
  it('should not end write stream when queue has items but no in-flight writes', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-test-${Date.now()}.db`);
    const db = new Dirty(tmpFile) as any;
    
    db.on('error', () => {});

    db.on('load', () => {
      // Set up state: queue has items, no in-flight writes
      db._data.set('testKey', 'testVal');
      db._queue.set('testKey', []);
      // _inFlightWrites = 0
      
      const writeStream = db._writeStream;
      
      // Call close() with _queue.size=1, _inFlightWrites=0
      db.close();
      
      // Synchronous check:
      // Original (||): condition is true → registers drain listener, returns → end() NOT called
      // Mutated (&&): condition is false → calls end() immediately → writableEnded = true
      const wasEndedImmediately = writeStream.writableEnded;
      
      // Clean up
      db.removeAllListeners('drain');
      db._queue.clear();
      if (db._readStream) db._readStream.destroy();
      if (!writeStream.writableEnded) {
        writeStream.end(() => {
          writeStream.destroy();
          try { fs.unlinkSync(tmpFile); } catch (_) {}
          done();
        });
      } else {
        writeStream.once('close', () => {
          try { fs.unlinkSync(tmpFile); } catch (_) {}
          done();
        });
      }
      
      expect(wasEndedImmediately).toBe(false);
    });
  });
});