import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('close method behavior with pending writes', () => {
  const testFile = path.join(__dirname, 'test-close.dirty');
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should delay close until drain event when there are pending writes', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      db.set('key1', 'value1', () => {
        // Immediately try to close while there might still be pending operations
        db.close();
        // The close should be delayed until drain
        db.on('write_close', () => {
          // Verify the file was written correctly
          const contents = fs.readFileSync(testFile, 'utf-8');
          expect(contents).toContain('key1');
          expect(contents).toContain('value1');
          done();
        });
      });
    });
  });
});