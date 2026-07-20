import { describe, it, expect } from '@jest/globals';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close() waits for in-flight writes when queue is empty', () => {
  it('should wait for in-flight writes to complete before closing, even when queue is empty', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-test-close-${Date.now()}.dirty`);

    const db = new Dirty(file);

    const events: string[] = [];

    db.on('load', () => {
      // Set a value - this triggers _flush() which moves from queue to in-flight
      // After _flush(), queue will be empty but there will be in-flight writes
      db.set('key1', 'value1');

      // Immediately call close - at this point:
      // - queue may be empty (flushed) but inFlightWrites > 0
      // Original: (0 || inFlightWrites > 0) = true → waits for drain
      // Mutated:  (0 && inFlightWrites > 0) = false → doesn't wait, closes immediately
      db.close();

      db.on('drain', () => {
        events.push('drain');
      });

      db.on('write_close', () => {
        events.push('write_close');

        // The write_close should happen after drain in the original code
        // In the mutated code, close() won't wait for drain when queue is empty
        // but inFlightWrites > 0, so write_close might fire before drain
        
        // Verify the file was actually written (data persisted)
        try {
          const contents = fs.readFileSync(file, 'utf-8');
          expect(contents).toContain('"key1"');
          expect(contents).toContain('"value1"');
        } catch (e) {
          // If file doesn't exist or is empty, the close happened too early
          done(new Error('File was closed before data was written'));
          return;
        }

        // Clean up
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        done();
      });
    });

    // Timeout safety
    setTimeout(() => {
      try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
      done(new Error('Test timed out'));
    }, 5000);
  });
});