import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty close behavior with in-flight writes', () => {
  const testDir = path.join(__dirname, 'test-dirty-close');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterEach(() => {
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
    }
    if (fs.existsSync(testDir)) {
      fs.rmdirSync(testDir);
    }
  });

  it('should wait for in-flight writes before closing', (done) => {
    const dirty = new Dirty(dbPath);
    dirty.on('load', () => {
      // Create in-flight writes by setting multiple values
      dirty.set('key1', { value: 'data1' });
      dirty.set('key2', { value: 'data2' });
      dirty.set('key3', { value: 'data3' });

      // Call close immediately while writes are in flight
      dirty.close();

      // Track if write_close event fires (indicating streams were closed)
      let writeCloseFired = false;
      dirty.on('write_close', () => {
        writeCloseFired = true;
      });

      // The original code should emit drain when all writes complete
      // The mutated code will never emit drain because it doesn't wait for writes
      dirty.on('drain', () => {
        // In original code, write_close should fire before drain
        // In mutated code, this won't happen consistently
        expect(writeCloseFired).toBe(true);
        done();
      });

      // Fail test if drain is not emitted within reasonable time
      setTimeout(() => {
        done(new Error('drain event was not emitted - mutation prevents waiting for in-flight writes'));
      }, 1000);
    });

    dirty.on('error', (err) => {
      done(err);
    });
  });
});