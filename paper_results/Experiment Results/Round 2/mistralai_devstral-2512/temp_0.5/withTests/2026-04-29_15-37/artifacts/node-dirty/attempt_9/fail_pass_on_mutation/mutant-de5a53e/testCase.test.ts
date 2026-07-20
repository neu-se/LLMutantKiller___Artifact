import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('write stream cleanup on close', () => {
  const testFile = path.join(__dirname, 'test-close-cleanup.dirty');
  let db: any;

  afterEach(() => {
    try {
      fs.unlinkSync(testFile);
    } catch (err) {
      // Ignore if file doesn't exist
    }
  });

  it('should properly nullify write stream after close', (done) => {
    db = new Dirty(testFile);

    db.on('load', () => {
      db.set('test', 'value', () => {
        const writeStreamBefore = db._writeStream;

        db.close();

        setTimeout(() => {
          // Original code: write stream should be null after close
          // Mutated code: write stream won't be properly destroyed and nullified
          expect(db._writeStream).toBeNull();
          done();
        }, 200);
      });
    });
  });
});