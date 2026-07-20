import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('close behavior with pending writes', () => {
  const testFile = path.join(__dirname, 'tmp', 'close-test.dirty');
  const tmpDir = path.join(__dirname, 'tmp');

  beforeAll(() => {
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }
  });

  afterAll(() => {
    try {
      if (fs.existsSync(testFile)) {
        fs.unlinkSync(testFile);
      }
      if (fs.existsSync(tmpDir)) {
        fs.rmdirSync(tmpDir);
      }
    } catch (err) {
      // Ignore cleanup errors
    }
  });

  it('should not close immediately when there are pending writes', (done) => {
    const db = new Dirty(testFile);
    let closeCalled = false;

    db.on('load', () => {
      // Set multiple values to ensure we have pending writes
      db.set('key1', 'value1');
      db.set('key2', 'value2');

      // Immediately call close while writes are pending
      db.close();
      closeCalled = true;

      // Check immediately after close() call that streams are still open
      // In the original code, close() should delay the actual closing
      // In the mutated code, close() will immediately close streams
      if (db._readStream === null || db._writeStream === null) {
        // This indicates the mutation is present - close happened immediately
        done(new Error('Close happened immediately without waiting for pending writes'));
        return;
      }

      // Verify that close was delayed and write_close event fires
      db.on('write_close', () => {
        expect(db._writeStream).toBeNull();
        done();
      });
    });
  });
});