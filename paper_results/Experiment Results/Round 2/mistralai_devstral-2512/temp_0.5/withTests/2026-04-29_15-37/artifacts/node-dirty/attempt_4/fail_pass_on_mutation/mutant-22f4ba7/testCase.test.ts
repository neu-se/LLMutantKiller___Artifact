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
    let writeCloseFired = false;
    let readCloseFired = false;

    db.on('load', () => {
      // Set multiple values to ensure we have pending writes
      db.set('key1', 'value1');
      db.set('key2', 'value2');

      // Immediately call close while writes are pending
      db.close();

      // Check immediately that streams are still open
      expect(db._readStream).not.toBeNull();
      expect(db._writeStream).not.toBeNull();

      // Verify that close was delayed and write_close event fires
      db.on('write_close', () => {
        writeCloseFired = true;
        expect(db._writeStream).toBeNull();
      });

      db.on('read_close', () => {
        readCloseFired = true;
        expect(db._readStream).toBeNull();
      });

      // Set a timeout to verify both events fired
      setTimeout(() => {
        expect(writeCloseFired).toBe(true);
        expect(readCloseFired).toBe(true);
        done();
      }, 500);
    });
  });
});