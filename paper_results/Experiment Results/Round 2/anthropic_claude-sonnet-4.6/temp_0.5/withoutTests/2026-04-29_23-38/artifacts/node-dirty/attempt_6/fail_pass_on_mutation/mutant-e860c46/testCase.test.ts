import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty close()', () => {
  it('should wait for queued writes before closing', (done) => {
    const dbPath = path.join(os.tmpdir(), `dirty-queue-test-${process.pid}.db`);
    try { fs.unlinkSync(dbPath); } catch (_e) {}

    const db = new Dirty(dbPath);

    db.on('load', () => {
      const callbacksCalled: string[] = [];
      
      // Write many large values to trigger backpressure (_waitForDrain=true)
      // so that _queue still has items when close() is called
      const largeVal = 'x'.repeat(64 * 1024);
      
      for (let i = 0; i < 20; i++) {
        db.set(`key${i}`, largeVal, (_err: unknown) => {
          callbacksCalled.push(`key${i}`);
        });
      }

      // Call close while queue likely still has items
      // Original: waits because _queue.size > 0
      // Mutated: also waits because _queue.size > 0
      // But after queue drains, _inFlightWrites may still be > 0
      // Original: waits again; Mutated: closes immediately
      db.close();

      db.once('write_close', () => {
        setTimeout(() => {
          try { fs.unlinkSync(dbPath); } catch (_e) {}
          try {
            // All 20 write callbacks should have been called
            expect(callbacksCalled.length).toBe(20);
            done();
          } catch (e) {
            done(e as Error);
          }
        }, 200);
      });
    });

    db.on('error', (err: Error) => {
      try { fs.unlinkSync(dbPath); } catch (_e) {}
      done(err);
    });
  }, 15000);
});