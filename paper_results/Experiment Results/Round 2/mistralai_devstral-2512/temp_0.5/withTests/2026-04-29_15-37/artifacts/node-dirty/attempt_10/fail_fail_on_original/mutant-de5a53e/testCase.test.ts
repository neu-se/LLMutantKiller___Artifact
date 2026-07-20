import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('write stream destruction behavior', () => {
  const testFile = path.join(__dirname, 'test-close-destruction.dirty');
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

        // Track if destroy callback executes
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
          // Mutated code: callback returns undefined, preventing proper destruction
          expect(destroyCallbackExecuted).toBe(true);
          done();
        }, 200);
      });
    });
  });
});