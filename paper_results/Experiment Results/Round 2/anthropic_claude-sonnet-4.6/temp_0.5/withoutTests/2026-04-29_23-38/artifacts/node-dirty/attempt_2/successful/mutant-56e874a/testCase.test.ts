// <Jest test file containing exactly one test case>
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty _flush waitForDrain guard', () => {
  it('should not call uncork on writeStream when _waitForDrain is true', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Set _waitForDrain to true to simulate backpressure state
      (db as any)._waitForDrain = true;

      const writeStream = (db as any)._writeStream;
      let uncorkCallCount = 0;
      const originalUncork = writeStream.uncork.bind(writeStream);
      writeStream.uncork = () => {
        uncorkCallCount++;
        originalUncork();
      };

      // Add something to the queue so _queue.size > 0
      (db as any)._data.set('key1', 'val1');
      (db as any)._queue.set('key1', []);

      // Call _flush directly
      (db as any)._flush();

      // Original: _waitForDrain is true, so _flush returns immediately -> uncork NOT called
      // Mutated: _waitForDrain check removed, so flush continues -> uncork IS called
      expect(uncorkCallCount).toBe(0);

      // Cleanup
      try {
        if ((db as any)._writeStream) (db as any)._writeStream.destroy();
        if ((db as any)._readStream) (db as any)._readStream.destroy();
      } catch (e) {}
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done();
    });

    db.on('error', () => {});
  });
});