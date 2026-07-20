import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('write stream destruction on close', () => {
  const testFile = path.join(__dirname, 'test-close-behavior.dirty');
  let db: Dirty;

  afterEach(() => {
    try {
      fs.unlinkSync(testFile);
    } catch (err) {
      // Ignore if file doesn't exist
    }
  });

  it('should destroy write stream when closed', (done) => {
    db = new Dirty(testFile);

    db.on('load', () => {
      db.set('key', 'value', () => {
        // Spy on the destroy method to verify it's called
        const originalDestroy = (db as any)._writeStream?.destroy;
        let destroyCalled = false;

        if (originalDestroy) {
          (db as any)._writeStream.destroy = function(...args: any[]) {
            destroyCalled = true;
            return originalDestroy.apply(this, args);
          };
        }

        db.close();

        db.on('write_close', () => {
          // In original code, destroy should be called
          // In mutated code, destroy won't be called (returns undefined)
          expect(destroyCalled).toBe(true);
          done();
        });
      });
    });
  });
});