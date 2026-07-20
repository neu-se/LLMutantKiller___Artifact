import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty database newline handling in data chunks', () => {
  const testFile = path.join(__dirname, 'test-newline.dirty');
  let db: any;

  beforeEach(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  afterEach(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  it('should handle chunks without newlines by buffering them', (done) => {
    // Create a test file with a chunk that doesn't contain newline
    // This specifically tests the mutation where lastIndexOf('\n') was changed to lastIndexOf("")
    const testData = '{"key":"test","val":"data"}';
    fs.writeFileSync(testFile, testData);

    db = new Dirty(testFile);

    let loadCalled = false;
    db.on('load', (length: number) => {
      loadCalled = true;
      // Original code should not process incomplete lines
      expect(length).toBe(0);
      expect(db.get('test')).toBeUndefined();
    });

    db.on('error', (err: Error) => {
      if (loadCalled) {
        // Original code should not emit error for incomplete line
        done();
      } else {
        // Mutated code will fail here because it checks for empty string
        // which will always be true, causing it to try processing incomplete lines
        done(new Error('Mutated code should not reach this point'));
      }
    });

    setTimeout(() => {
      if (!loadCalled) {
        done(new Error('Load event should have been called'));
      }
    }, 100);
  });
});