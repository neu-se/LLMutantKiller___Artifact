import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('close method with pending operations', () => {
  const testFile = path.join(__dirname, 'test-close-pending.dirty');
  let db: any;

  beforeEach(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  afterEach(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  it('should delay close when there are pending operations', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Create pending operations
      db.set('key1', 'value1');
      db.set('key2', 'value2');

      // Track close execution
      let closeCalled = false;
      const originalClose = db.close.bind(db);
      db.close = function() {
        closeCalled = true;
        return originalClose();
      };

      // Call close immediately
      db.close();

      // In original code: close should be delayed
      // In mutated code: close executes immediately
      setImmediate(() => {
        if (closeCalled) {
          // Mutation present - close was called immediately
          // Verify streams are still open
          expect(db._writeStream).not.toBeNull();
          expect(db._readStream).not.toBeNull();
          done();
        } else {
          // Original behavior - close was delayed
          db.on('write_close', () => {
            expect(db._writeStream).toBeNull();
            expect(db._readStream).toBeNull();
            done();
          });
        }
      });
    });
  });
});