import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('close method behavior with pending operations', () => {
  const testFile = path.join(__dirname, 'test-close.dirty');
  let db: any;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should delay close until pending writes complete', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Set a value which will trigger a write operation
      db.set('test', 'value', () => {
        // Immediately call close while there might still be pending operations
        db.close();

        // The close should be delayed until drain event
        db.on('write_close', () => {
          // Verify the file was properly written and closed
          const contents = fs.readFileSync(testFile, 'utf-8');
          expect(contents).toContain('test');
          expect(contents).toContain('value');
          done();
        });
      });
    });
  });
});