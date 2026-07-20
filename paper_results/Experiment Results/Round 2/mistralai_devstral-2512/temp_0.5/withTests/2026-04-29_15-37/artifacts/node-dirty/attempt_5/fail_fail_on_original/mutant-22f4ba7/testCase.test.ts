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

  it('should emit drain event before closing when writes are pending', (done) => {
    const db = new Dirty(testFile);
    let drainFired = false;
    let writeCloseFired = false;

    db.on('load', () => {
      // Set multiple values to ensure we have pending writes
      db.set('key1', 'value1', () => {
        db.set('key2', 'value2', () => {
          // Immediately call close while writes are pending
          db.close();

          // Check that drain event fires before write_close
          db.on('drain', () => {
            drainFired = true;
            expect(db._writeStream).not.toBeNull();
          });

          db.on('write_close', () => {
            writeCloseFired = true;
            expect(drainFired).toBe(true);
            expect(db._writeStream).toBeNull();
            done();
          });
        });
      });
    });
  });
});