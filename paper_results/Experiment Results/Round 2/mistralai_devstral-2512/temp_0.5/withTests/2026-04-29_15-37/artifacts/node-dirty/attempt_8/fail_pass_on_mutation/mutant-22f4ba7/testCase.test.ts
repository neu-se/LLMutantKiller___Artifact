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

  it('should not close streams immediately when writes are pending', (done) => {
    const db = new Dirty(testFile);

    db.on('load', () => {
      // Set multiple values to ensure we have pending writes
      db.set('key1', 'value1');
      db.set('key2', 'value2');

      // Check that streams are open before close
      expect(db._readStream).not.toBeNull();
      expect(db._writeStream).not.toBeNull();

      // Immediately call close while writes are pending
      db.close();

      // Check immediately after close() call that streams are still open
      // This is the key difference - in the original code, close() should
      // delay the actual closing until pending writes complete
      expect(db._readStream).not.toBeNull();
      expect(db._writeStream).not.toBeNull();

      // Verify that close was delayed and write_close event fires
      db.on('write_close', () => {
        expect(db._writeStream).toBeNull();
        done();
      });
    });
  });
});