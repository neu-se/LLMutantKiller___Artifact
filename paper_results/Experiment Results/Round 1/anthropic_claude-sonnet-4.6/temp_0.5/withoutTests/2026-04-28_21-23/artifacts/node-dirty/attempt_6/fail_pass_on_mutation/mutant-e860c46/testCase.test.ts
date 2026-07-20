import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty close() with in-flight writes', () => {
  it('should not close prematurely when _inFlightWrites > 0 and _waitForDrain is true', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Write many large values to trigger backpressure (_waitForDrain = true)
      // This means _flush() will break early, leaving items in _queue
      // and _inFlightWrites > 0
      const largeValue = 'x'.repeat(64 * 1024); // 64KB per entry
      
      for (let i = 0; i < 100; i++) {
        db.set(`key${i}`, { data: largeValue, index: i });
      }

      // Force close - with backpressure, _queue.size > 0 OR _inFlightWrites > 0
      // Original waits for drain (handles both cases)
      // Mutated only waits if _queue.size > 0, but once queue drains to 0
      // and _inFlightWrites > 0, it will close prematurely
      db.close();

      db.once('write_close', () => {
        try {
          const fileContent = fs.readFileSync(dbPath, 'utf-8');
          const lines = fileContent.trim().split('\n').filter(l => l.length > 0);
          // All 100 entries should be written
          expect(lines.length).toBe(100);
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
  }, 30000);
});