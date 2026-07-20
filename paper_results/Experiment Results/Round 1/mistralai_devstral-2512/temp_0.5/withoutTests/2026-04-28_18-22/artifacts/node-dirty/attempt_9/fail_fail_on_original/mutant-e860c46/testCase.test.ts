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

  it('should emit drain event when closing with in-flight writes', (done) => {
    const dirty = new Dirty(dbPath);
    dirty.on('load', () => {
      // Create in-flight writes by setting multiple values
      dirty.set('key1', { value: 'data1' });
      dirty.set('key2', { value: 'data2' });
      dirty.set('key3', { value: 'data3' });

      // Call close immediately while writes are in flight
      dirty.close();

      // The original code should emit drain when all writes complete
      // The mutated code will never emit drain because it doesn't wait for writes
      dirty.on('drain', () => {
        // Verify all writes completed
        expect(dirty.get('key1')).toEqual({ value: 'data1' });
        expect(dirty.get('key2')).toEqual({ value: 'data2' });
        expect(dirty.get('key3')).toEqual({ value: 'data3' });
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