import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('flush behavior with queue and drain', () => {
  const testFile = path.join(__dirname, 'test-flush.dirty');
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should not flush when queue is empty', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Verify no flush happens when queue is empty
      setTimeout(() => {
        // File should not exist or be empty
        try {
          const content = fs.readFileSync(testFile, 'utf-8');
          expect(content).toBe('');
        } catch (e) {
          expect(e.code).toBe('ENOENT');
        }
        done();
      }, 50);
    });
  });
});