import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty close() with pending writes', () => {
  it('should re-schedule close via drain event when queue has pending items', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Force _waitForDrain = true so that _flush() will not write anything
      // This ensures items stay in _queue when close() is called
      (db as any)._waitForDrain = true;

      // Now set values - they go into _queue but _flush() returns early due to _waitForDrain
      for (let i = 0; i < 3; i++) {
        db.set(`key${i}`, { value: `data${i}` });
      }

      // Verify items are in queue
      expect((db as any)._queue.size).toBe(3);

      // Now call close() - original code sees queue.size > 0, registers drain listener and returns
      // Mutated code ignores the condition and closes immediately
      db.close();

      // Now simulate drain by resetting _waitForDrain and triggering the drain event on writeStream
      // This is what would happen naturally when the OS drains the buffer
      (db as any)._waitForDrain = false;
      // Emit drain on the write stream to trigger the internal handler
      (db as any)._writeStream.emit('drain');

      db.on('write_close', () => {
        try {
          const fileContent = fs.readFileSync(dbPath, 'utf-8');
          const lines = fileContent.trim().split('\n').filter((l: string) => l.length > 0);

          // Original: drain triggers close() again, which now flushes and writes all 3 keys
          // Mutated: write stream was already closed before drain, so 0 lines written
          expect(lines.length).toBe(3);

          fs.rmSync(tmpDir, { recursive: true, force: true });
          done();
        } catch (err) {
          fs.rmSync(tmpDir, { recursive: true, force: true });
          done(err);
        }
      });
    });

    db.on('error', (err: Error) => {
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done(err);
    });
  }, 10000);
});