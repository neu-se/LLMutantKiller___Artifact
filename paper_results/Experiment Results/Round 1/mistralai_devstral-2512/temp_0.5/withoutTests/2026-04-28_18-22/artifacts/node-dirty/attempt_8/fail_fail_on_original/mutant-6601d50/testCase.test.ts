import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty close method', () => {
  it('should properly handle close with pending operations', (done) => {
    const testDir = path.join(__dirname, 'test-dir');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up any existing test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    const dirty = new Dirty(dbPath);
    let drainListenerCount = 0;

    dirty.on('load', () => {
      // Add data to create pending writes
      dirty.set('key1', { value: 'test1' }, () => {
        dirty.set('key2', { value: 'test2' }, () => {
          // Count listeners before close
          const beforeCount = dirty.listenerCount('drain');

          // Call close while there are pending operations
          dirty.close();

          // Count listeners after close
          const afterCount = dirty.listenerCount('drain');

          // In original code, a drain listener should be added
          // In mutated code, empty string listener won't affect drain count
          expect(afterCount).toBeGreaterThan(beforeCount);

          // Clean up
          fs.rmSync(testDir, { recursive: true });
          done();
        });
      });
    });

    dirty.on('error', (err) => {
      fs.rmSync(testDir, { recursive: true });
      done(err);
    });
  });
});