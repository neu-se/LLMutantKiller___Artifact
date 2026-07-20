import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('write stream destruction verification', () => {
  const testFile = path.join(__dirname, 'test-close-verification.dirty');
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

        // Track if destroy was called with proper callback
        let destroyCalledWithCallback = false;
        writeStream.destroy = function(callback?: Function) {
          if (callback) {
            destroyCalledWithCallback = true;
          }
          return originalDestroy.call(this, callback);
        };

        db.close();

        setTimeout(() => {
          // Original code: destroy should be called with callback
          // Mutated code: destroy is called but callback returns undefined
          expect(destroyCalledWithCallback).toBe(true);
          done();
        }, 200);
      });
    });
  });
});