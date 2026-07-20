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
    let drainFired = false;
    let writeCloseFired = false;

    db.on('load', () => {
      // Set a value which will trigger a write
      db.set('test', 'value');

      // Try to close immediately - should be delayed
      db.close();
    });

    db.on('drain', () => {
      drainFired = true;
    });

    db.on('write_close', () => {
      writeCloseFired = true;
      // In the original code, drain should have fired before write_close
      // In the mutated code, write_close fires immediately without waiting for drain
      expect(drainFired).toBe(true);
      done();
    });
  });
});