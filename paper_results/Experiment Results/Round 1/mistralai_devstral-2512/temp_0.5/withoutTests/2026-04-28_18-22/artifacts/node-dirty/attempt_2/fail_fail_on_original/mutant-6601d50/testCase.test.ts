import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty close method', () => {
  it('should properly close when called with pending operations', (done) => {
    const testDir = path.join(__dirname, 'test-dir');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up any existing test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    const dirty = new Dirty(dbPath);
    let closeCalled = false;

    dirty.on('load', () => {
      // Add data to create pending writes
      dirty.set('key1', { value: 'test1' }, () => {
        dirty.set('key2', { value: 'test2' }, () => {
          // Call close while there might be pending operations
          dirty.close();
          closeCalled = true;
        });
      });
    });

    dirty.on('drain', () => {
      if (closeCalled) {
        // Verify streams are closed after drain
        expect(dirty._readStream).toBeNull();
        expect(dirty._writeStream).toBeNull();

        // Clean up
        fs.rmSync(testDir, { recursive: true });
        done();
      }
    });

    dirty.on('error', (err) => {
      fs.rmSync(testDir, { recursive: true });
      done(err);
    });

    // Timeout to prevent hanging
    setTimeout(() => {
      fs.rmSync(testDir, { recursive: true });
      done(new Error('Test timed out'));
    }, 5000);
  });
});