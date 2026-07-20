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
    let writeCloseFired = false;
    let drainFired = false;

    db.on('load', () => {
      // Set a value which will trigger a write
      db.set('test', 'value');

      // Try to close immediately
      db.close();

      // In original code, drain should fire before write_close
      // In mutated code, write_close fires immediately
      setTimeout(() => {
        if (writeCloseFired && !drainFired) {
          // Mutated behavior - close happened before drain
          done(new Error('Close should wait for drain when there are pending writes'));
        }
      }, 10);
    });

    db.on('drain', () => {
      drainFired = true;
    });

    db.on('write_close', () => {
      writeCloseFired = true;
      // Original behavior - drain fired before write_close
      expect(drainFired).toBe(true);
      done();
    });
  });
});