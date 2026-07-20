import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('write stream cleanup on close', () => {
  const testFile = path.join(__dirname, 'test-close-cleanup.dirty');
  let db: Dirty;

  afterEach(() => {
    try {
      fs.unlinkSync(testFile);
    } catch (err) {
      // Ignore if file doesn't exist
    }
  });

  it('should nullify write stream after close', (done) => {
    db = new Dirty(testFile);

    db.on('load', () => {
      db.set('test', 'value', () => {
        db.close();

        db.on('write_close', () => {
          // In original code, the stream should be destroyed and nullified
          // In mutated code, the stream won't be properly destroyed
          expect((db as any)._writeStream).toBeNull();
          done();
        });
      });
    });
  });
});