// <Jest test file containing exactly one test case>
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { rimraf } from 'rimraf';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty _flush waitForDrain guard', () => {
  it('should not attempt to write when _waitForDrain is true, preventing double-cork/uncork', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Manually set _waitForDrain to true to simulate backpressure
      db._waitForDrain = true;

      // Track how many times cork is called
      const originalCork = db._writeStream.cork.bind(db._writeStream);
      let corkCallCount = 0;
      db._writeStream.cork = () => {
        corkCallCount++;
        originalCork();
      };

      // Queue a key so _queue.size > 0
      db._data.set('key1', 'val1');
      db._queue.set('key1', []);

      // Call _flush - original should return early due to _waitForDrain
      db._flush();

      // In original code: _waitForDrain is true, so _flush returns immediately without calling cork
      // In mutated code: _waitForDrain check is removed, so cork gets called
      expect(corkCallCount).toBe(0);

      rimraf(tmpDir).then(() => done()).catch(done);
    });

    db.on('error', done);
  });
});