import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty close method behavior', () => {
  it('should not destroy writeStream when writeStream is null', (done) => {
    const testDir = path.join(__dirname, 'test-dir');
    const dbPath = path.join(testDir, 'test.db');

    // Ensure clean state
    rimraf.sync(testDir);
    fs.mkdirSync(testDir, { recursive: true });

    const dirty = new Dirty(dbPath);

    // Force close the write stream to simulate the condition
    dirty._writeStream = null;

    // Spy on the destroy method to verify it's not called
    const originalDestroy = dirty._writeStream?.destroy;
    let destroyCalled = false;
    if (originalDestroy) {
      dirty._writeStream.destroy = function(...args) {
        destroyCalled = true;
        return originalDestroy.apply(this, args);
      };
    }

    dirty.close();

    // Give some time for async operations
    setTimeout(() => {
      expect(destroyCalled).toBe(false);
      rimraf.sync(testDir);
      done();
    }, 100);
  });
});