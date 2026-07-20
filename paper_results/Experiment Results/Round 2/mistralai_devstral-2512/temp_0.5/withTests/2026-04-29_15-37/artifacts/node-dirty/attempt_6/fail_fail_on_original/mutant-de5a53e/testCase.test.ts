import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('write stream cleanup verification', () => {
  const testFile = path.join(__dirname, 'test-close-cleanup.dirty');
  let db: any;

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
        const writeStream = db._writeStream;
        const originalDestroy = writeStream.destroy;

        // Track if destroy callback is properly executed
        let destroyCallbackExecuted = false;
        writeStream.destroy = function(callback?: Function) {
          if (callback) {
            const originalCallback = callback;
            callback = function() {
              destroyCallbackExecuted = true;
              originalCallback();
            };
          }
          return originalDestroy.call(this, callback);
        };

        db.close();

        setTimeout(() => {
          // Original code: destroy callback should execute
          // Mutated code: callback returns undefined, preventing proper execution
          expect(destroyCallbackExecuted).toBe(true);
          done();
        }, 100);
      });
    });
  });
});