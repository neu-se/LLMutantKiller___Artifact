import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty close behavior', () => {
  const testDir = path.join(__dirname, 'test-dirty-close');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rimraf.sync(testDir);
  });

  it('should emit drain event when closing with in-flight writes', (done) => {
    const dirty = new Dirty(dbPath);
    dirty.on('load', () => {
      // Set up a scenario with in-flight writes
      dirty.set('key1', { value: 'data1' }, () => {
        // This callback should be called before drain
      });

      // Force _inFlightWrites to be > 0 by setting a value
      // The mutation changes the condition from checking _inFlightWrites to always false
      dirty.set('key2', { value: 'data2' });

      // Now close - should wait for drain
      dirty.close();

      // The original code should emit drain when _inFlightWrites reaches 0
      // The mutated code will never emit drain because it doesn't check _inFlightWrites
      dirty.on('drain', () => {
        done();
      });

      // Fail test if drain is not emitted within reasonable time
      setTimeout(() => {
        done(new Error('drain event was not emitted'));
      }, 1000);
    });

    dirty.on('error', (err) => {
      done(err);
    });
  });
});