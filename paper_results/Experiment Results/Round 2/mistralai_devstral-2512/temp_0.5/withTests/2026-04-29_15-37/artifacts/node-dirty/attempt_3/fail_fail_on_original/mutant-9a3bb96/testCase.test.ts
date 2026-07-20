import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('close behavior with pending operations', () => {
  const testFile = path.join(__dirname, 'tmp', 'close-test.dirty');
  const tmpDir = path.join(__dirname, 'tmp');

  beforeAll(() => {
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }
  });

  afterAll(() => {
    rimraf.sync(tmpDir);
  });

  it('should not close immediately when there are pending operations', (done) => {
    const db = new Dirty(testFile);
    let closeCalled = false;
    let drainFired = false;

    db.on('load', () => {
      // Set a value which will trigger a write
      db.set('test', 'value', () => {
        drainFired = true;
      });

      // Try to close immediately - should be delayed
      db.close();
      closeCalled = true;
    });

    // Check that close was called but write_close hasn't fired yet
    setTimeout(() => {
      expect(closeCalled).toBe(true);
      expect(drainFired).toBe(false);

      // Now wait for the actual close
      db.on('write_close', () => {
        done();
      });
    }, 50);
  });
});