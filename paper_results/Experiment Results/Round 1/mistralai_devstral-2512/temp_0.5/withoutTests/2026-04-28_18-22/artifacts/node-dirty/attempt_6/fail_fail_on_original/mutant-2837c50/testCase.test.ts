import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty close behavior', () => {
  it('should properly close when called with pending writes', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const dirty = new Dirty(dbPath);

    dirty.once('load', () => {
      // Add data to create pending writes
      dirty.set('key1', { value: 'test1' });
      dirty.set('key2', { value: 'test2' });

      // Track if close was called recursively
      let closeCalled = false;
      const originalClose = dirty.close.bind(dirty);
      dirty.close = function() {
        if (closeCalled) {
          // This indicates the recursive call from drain event
          closeCalled = 'recursive';
          return;
        }
        closeCalled = true;
        originalClose();
      };

      // Force close while there are pending writes
      dirty.close();

      // Check if close was called recursively (indicating proper drain handling)
      setImmediate(() => {
        try {
          if (closeCalled !== 'recursive') {
            throw new Error('Close should be called recursively when there are pending writes');
          }
          fs.unlinkSync(dbPath);
          fs.rmdirSync(testDir);
          done();
        } catch (err) {
          fs.unlinkSync(dbPath);
          fs.rmdirSync(testDir);
          done(err);
        }
      });
    });

    dirty.on('error', (err) => {
      fs.unlinkSync(dbPath);
      fs.rmdirSync(testDir);
      done(err);
    });
  });
});