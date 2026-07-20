import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('close behavior with pending operations', () => {
  const testFile = path.join(__dirname, 'test-close.dirty');

  beforeEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  afterEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  it('should not close immediately when there are pending writes', (done) => {
    const db = new Dirty(testFile);
    let closeCalled = false;
    let writeCloseFired = false;

    db.on('load', () => {
      // Set a value which will trigger a write
      db.set('test', 'value');

      // Try to close immediately - should be delayed
      db.close();
      closeCalled = true;

      // Check immediately - in mutated code, write_close will fire right away
      // In original code, it should be delayed
      setTimeout(() => {
        if (writeCloseFired) {
          // Mutated code behavior - close happened immediately
          done(new Error('Close should not have fired immediately with pending writes'));
        }
        // Original code behavior - close is delayed, test passes
      }, 10);
    });

    db.on('write_close', () => {
      writeCloseFired = true;
    });

    // Give some time for the delayed close to happen
    setTimeout(() => {
      if (!writeCloseFired) {
        done();
      }
    }, 100);
  });
});