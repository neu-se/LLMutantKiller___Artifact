import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('write stream destruction behavior', () => {
  const testFile = path.join(__dirname, 'test-close-destruction.dirty');
  let db: Dirty;

  afterEach(() => {
    try {
      fs.unlinkSync(testFile);
    } catch (err) {
      // Ignore if file doesn't exist
    }
  });

  it('should properly destroy write stream when closed', (done) => {
    db = new Dirty(testFile);

    db.on('load', () => {
      db.set('test', 'value', () => {
        const writeStream = (db as any)._writeStream;
        const originalDestroy = writeStream.destroy;

        // Track if destroy was called with proper callback
        let destroyCallbackExecuted = false;
        writeStream.destroy = function(callback?: Function) {
          if (callback) {
            const originalCallback = callback;
            callback = function() {
              destroyCallbackExecuted = true;
              originalCallback.apply(this, arguments);
            };
          }
          return originalDestroy.call(this, callback);
        };

        db.close();

        db.on('write_close', () => {
          // Original code: destroy should be called with callback that gets executed
          // Mutated code: destroy is called but callback returns undefined, preventing proper cleanup
          expect(destroyCallbackExecuted).toBe(true);
          done();
        });
      });
    });
  });
});