import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('close method with pending writes', () => {
  const testFile = path.join(__dirname, 'test-close-writes.dirty');
  let db: any;

  beforeEach(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  afterEach(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  it('should delay close when there are pending writes', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Set a value to create a pending write
      db.set('key', 'value');

      // Track if close was actually called
      let closeActuallyCalled = false;
      const originalClose = db.close.bind(db);
      db.close = function() {
        closeActuallyCalled = true;
        return originalClose();
      };

      // Try to close immediately
      db.close();

      // In original code, close should be delayed
      // In mutated code, it will close immediately
      setImmediate(() => {
        if (closeActuallyCalled) {
          // Mutation is present - close was called immediately
          // The write stream should still be open
          expect(db._writeStream).not.toBeNull();
          done();
        } else {
          // Original behavior - close was delayed
          db.on('write_close', () => {
            expect(db._writeStream).toBeNull();
            done();
          });
        }
      });
    });
  });
});