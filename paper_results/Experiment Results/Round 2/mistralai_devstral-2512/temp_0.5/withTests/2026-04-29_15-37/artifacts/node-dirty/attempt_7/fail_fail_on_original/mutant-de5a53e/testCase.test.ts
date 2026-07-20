import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('write stream destruction on close', () => {
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
        // Store reference to write stream before close
        const writeStreamBefore = db._writeStream;

        // Override destroy to track if it's called properly
        let destroyCalledProperly = false;
        const originalDestroy = writeStreamBefore.destroy;
        writeStreamBefore.destroy = function(callback?: Function) {
          if (callback) {
            destroyCalledProperly = true;
          }
          return originalDestroy.call(this, callback);
        };

        db.close();

        setTimeout(() => {
          // Original code: destroy should be called with callback
          // Mutated code: destroy is called but callback returns undefined
          expect(destroyCalledProperly).toBe(true);
          expect(db._writeStream).toBeNull();
          done();
        }, 100);
      });
    });
  });
});