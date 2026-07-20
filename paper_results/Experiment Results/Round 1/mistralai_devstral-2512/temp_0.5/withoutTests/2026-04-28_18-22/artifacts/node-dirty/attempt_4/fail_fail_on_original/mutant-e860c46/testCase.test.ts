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
    let closeCalled = false;

    dirty.on('load', () => {
      // Set a value with callback to create in-flight write
      dirty.set('testKey', { value: 'testValue' }, () => {
        // This callback should complete before close finishes
      });

      // Override close to track when it's called
      const originalClose = dirty.close.bind(dirty);
      dirty.close = () => {
        closeCalled = true;
        originalClose();
      };

      // Immediately call close while write is in flight
      dirty.close();

      // In original code, close should wait for in-flight writes
      // In mutated code, close will proceed immediately
      expect(closeCalled).toBe(true);

      // Check if drain event fires (should in original, shouldn't in mutated)
      dirty.on('drain', () => {
        done();
      });

      // Fail if drain doesn't fire within timeout
      setTimeout(() => {
        done(new Error('Test timeout - drain event not emitted'));
      }, 1000);
    });

    dirty.on('error', (err) => {
      done(err);
    });
  });
});