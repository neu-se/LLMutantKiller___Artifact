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
    dirty.on('load', () => {
      // Create in-flight writes
      dirty.set('key1', { value: 'data1' });
      dirty.set('key2', { value: 'data2' });

      // Call close while writes are in flight
      dirty.close();

      // Track if drain event fires
      let drainFired = false;
      dirty.on('drain', () => {
        drainFired = true;
        // Verify all writes completed
        expect(dirty.get('key1')).toEqual({ value: 'data1' });
        expect(dirty.get('key2')).toEqual({ value: 'data2' });
        done();
      });

      // Fail test if drain is not emitted within reasonable time
      setTimeout(() => {
        if (!drainFired) {
          done(new Error('drain event was not emitted - mutation prevents waiting for in-flight writes'));
        }
      }, 1000);
    });

    dirty.on('error', (err) => {
      done(err);
    });
  });
});