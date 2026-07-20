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

  it('should delay close when there are pending writes', (done) => {
    const db = new Dirty(testFile);
    let closeAttempted = false;
    let writeCloseFired = false;

    db.on('load', () => {
      // Set a value which will trigger a write
      db.set('test', 'value');

      // Try to close immediately
      db.close();
      closeAttempted = true;

      // In original code, close should be delayed until drain
      // In mutated code, close happens immediately
      setTimeout(() => {
        if (closeAttempted && !writeCloseFired) {
          // Original behavior - close was delayed
          done();
        } else {
          // Mutated behavior - close happened immediately
          done(new Error('Close should be delayed when there are pending writes'));
        }
      }, 50);
    });

    db.on('write_close', () => {
      writeCloseFired = true;
    });
  });
});