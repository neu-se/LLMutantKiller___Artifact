import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close() waits for queued items', () => {
  it('should persist all queued data before closing', (done) => {
    const file = path.join(os.tmpdir(), `dirty-queue-${process.pid}.dirty`);

    const cleanup = () => {
      try { fs.unlinkSync(file); } catch (_) {}
    };

    const db = new Dirty(file);

    db.on('load', () => {
      // Intercept the write stream's write method to inject a set() call
      // synchronously inside the write callback, before _inFlightWrites is decremented
      // Actually we need _inFlightWrites === 0 when close() is called
      // 
      // Strategy: use the set() callback which fires when write completes
      // At that moment _inFlightWrites has been decremented
      // Add to queue synchronously in the callback, then call close()

      db.set('key1', 'val1', () => {
        // Inside write callback: _inFlightWrites just decremented to 0
        // _queue.size === 0 at this point
        // Now add a new item to queue - _flush() will be called but
        // since we're inside a write callback, let's check...
        // Actually _flush() IS called synchronously in set(), so key2 goes to in-flight
        // We need to prevent _flush() from running...
        
        // Intercept _flush to be a no-op temporarily
        const originalFlush = db._flush.bind(db);
        db._flush = () => {};
        
        db.set('key2', 'val2'); // stays in queue, no flush
        
        // Now: _queue.size === 1, _inFlightWrites === 0
        // Original close(): (1 || false) = true → waits for drain
        // Mutated close():  (1 && false) = false → closes immediately, key2 lost
        
        // Restore flush so drain can eventually be processed
        db._flush = originalFlush;
        
        db.close();
        
        db.once('write_close', () => {
          const contents = fs.readFileSync(file, 'utf-8');
          cleanup();
          expect(contents).toContain('"key2"');
          done();
        });
      });
    });
  });
});