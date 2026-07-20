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

  it('should properly handle close when there are in-flight writes', (done) => {
    const dirty = new Dirty(dbPath);
    let loadFired = false;
    let drainFired = false;

    dirty.on('load', () => {
      loadFired = true;
      // Set multiple values to ensure we have in-flight writes
      dirty.set('key1', { data: 'value1' });
      dirty.set('key2', { data: 'value2' });
      dirty.set('key3', { data: 'value3' });

      // Immediately close while writes are in flight
      dirty.close();

      // The original code should wait for in-flight writes to complete
      // The mutated code will immediately try to close without waiting
    });

    dirty.on('drain', () => {
      drainFired = true;
      // Verify that all writes completed
      expect(dirty.get('key1')).toEqual({ data: 'value1' });
      expect(dirty.get('key2')).toEqual({ data: 'value2' });
      expect(dirty.get('key3')).toEqual({ data: 'value3' });
      done();
    });

    dirty.on('error', (err) => {
      done(err);
    });

    // Fail test if drain is not emitted within reasonable time
    setTimeout(() => {
      if (!drainFired) {
        done(new Error('drain event was not emitted - mutation prevents proper waiting for in-flight writes'));
      }
    }, 2000);
  });
});