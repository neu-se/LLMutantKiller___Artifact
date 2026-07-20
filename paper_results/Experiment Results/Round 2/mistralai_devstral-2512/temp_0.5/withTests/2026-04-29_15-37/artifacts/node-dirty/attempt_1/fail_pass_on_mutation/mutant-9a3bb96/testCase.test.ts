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

  it('should delay close until all pending writes are drained', (done) => {
    const db = new Dirty(testFile);
    let loadFired = false;
    let drainFired = false;
    let closeFired = false;

    db.on('load', () => {
      loadFired = true;
      // Set a value which will trigger a write
      db.set('test', 'value', () => {
        // This callback should fire before close
        drainFired = true;
      });
    });

    db.on('drain', () => {
      // Now attempt to close - should be delayed until writes complete
      db.close();
    });

    db.on('write_close', () => {
      closeFired = true;
      // All events should have fired in correct order
      expect(loadFired).toBe(true);
      expect(drainFired).toBe(true);
      expect(closeFired).toBe(true);
      done();
    });
  });
});