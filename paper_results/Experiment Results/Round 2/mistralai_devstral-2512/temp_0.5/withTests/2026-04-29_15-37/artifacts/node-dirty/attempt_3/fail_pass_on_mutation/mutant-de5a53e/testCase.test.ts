import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('write stream destruction verification', () => {
  const testFile = path.join(__dirname, 'test-close-verification.dirty');
  let db: Dirty;

  afterEach(() => {
    try {
      fs.unlinkSync(testFile);
    } catch (err) {
      // Ignore if file doesn't exist
    }
  });

  it('should properly destroy write stream after close', (done) => {
    db = new Dirty(testFile);

    db.on('load', () => {
      db.set('test', 'value', () => {
        // Store reference to write stream before close
        const writeStreamBefore = (db as any)._writeStream;

        db.close();

        db.on('write_close', () => {
          // In original code, the stream should be destroyed
          // In mutated code, the stream won't be destroyed (callback returns undefined)
          if (writeStreamBefore) {
            expect(writeStreamBefore.destroyed).toBe(true);
          }
          done();
        });
      });
    });
  });
});