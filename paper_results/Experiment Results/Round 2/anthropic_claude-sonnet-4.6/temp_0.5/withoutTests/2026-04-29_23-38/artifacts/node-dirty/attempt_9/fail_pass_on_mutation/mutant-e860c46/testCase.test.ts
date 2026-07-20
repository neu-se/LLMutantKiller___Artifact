import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty close()', () => {
  it('should handle close called when _inFlightWrites > 0 by waiting for all writes', (done) => {
    const dbPath = path.join(os.tmpdir(), `dirty-multi-${process.pid}.db`);
    try { fs.unlinkSync(dbPath); } catch (_e) {}

    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Write multiple keys - this may result in multiple in-flight writes
      // with _queue.size=0 after flush
      const cbs: string[] = [];
      
      db.set('a', '1', (_err: unknown) => cbs.push('a'));
      db.set('b', '2', (_err: unknown) => cbs.push('b'));
      db.set('c', '3', (_err: unknown) => cbs.push('c'));

      // Force a scenario: after the first drain (all 3 written together in one flush),
      // do another write and close immediately
      db.once('drain', () => {
        cbs.push('drain1');
        
        // Now write again - this triggers flush with _inFlightWrites=1, _queue.size=0
        db.set('d', '4', (_err: unknown) => cbs.push('d'));
        
        // close() called: _queue.size=0, _inFlightWrites=1
        // Original: waits for drain, then closes -> 'd' callback fires before write_close
        // Mutated: closes immediately -> write_close may fire before 'd' callback
        db.close();
        
        db.once('write_close', () => {
          try { fs.unlinkSync(dbPath); } catch (_e) {}
          // Wait for any pending callbacks
          setImmediate(() => {
            try {
              expect(cbs).toContain('d');
              expect(cbs.indexOf('d')).toBeLessThan(cbs.indexOf('write_close') === -1 ? cbs.length : cbs.indexOf('write_close'));
              done();
            } catch (e) {
              done(e as Error);
            }
          });
          cbs.push('write_close');
        });
      });
    });

    db.on('error', (err: Error) => {
      try { fs.unlinkSync(dbPath); } catch (_e) {}
      done(err);
    });
  }, 10000);
});