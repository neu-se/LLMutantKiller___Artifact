import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('close method behavior', () => {
  const testFile = path.join(__dirname, 'test-close.dirty');
  let db: Dirty;

  afterEach(() => {
    try {
      fs.unlinkSync(testFile);
    } catch (err) {
      // Ignore if file doesn't exist
    }
  });

  it('should properly destroy write stream after closing', (done) => {
    db = new Dirty(testFile);

    db.on('load', () => {
      db.set('test', 'value', () => {
        db.close();

        db.on('write_close', () => {
          // Verify the write stream is properly destroyed
          const writeStream = (db as any)._writeStream;
          if (writeStream) {
            // The original code destroys the stream, so it should be null or destroyed
            // The mutant returns undefined instead of destroying, so the stream will still exist
            expect(writeStream.destroyed).toBe(true);
          } else {
            // If stream is null, that's also acceptable behavior
            expect(true).toBe(true);
          }
          done();
        });
      });
    });
  });
});