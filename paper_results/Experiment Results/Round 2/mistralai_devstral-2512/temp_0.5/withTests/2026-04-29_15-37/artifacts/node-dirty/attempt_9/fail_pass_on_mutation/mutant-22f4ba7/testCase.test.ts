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

  it('should wait for drain event before closing when writes are pending', (done) => {
    const db = new Dirty(testFile);
    let drainEventFired = false;

    db.on('load', () => {
      // Set multiple values to ensure we have pending writes
      db.set('key1', 'value1');
      db.set('key2', 'value2');

      // Listen for drain event
      db.on('drain', () => {
        drainEventFired = true;
      });

      // Immediately call close while writes are pending
      db.close();

      // Check immediately that streams are still open
      expect(db._readStream).not.toBeNull();
      expect(db._writeStream).not.toBeNull();

      // Verify that close was delayed and write_close event fires
      db.on('write_close', () => {
        expect(drainEventFired).toBe(true);
        expect(db._writeStream).toBeNull();
        done();
      });
    });
  });
});