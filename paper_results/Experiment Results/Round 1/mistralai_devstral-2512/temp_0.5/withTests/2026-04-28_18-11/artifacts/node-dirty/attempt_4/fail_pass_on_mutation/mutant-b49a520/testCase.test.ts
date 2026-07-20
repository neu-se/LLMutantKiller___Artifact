import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty database chunk processing with partial line', () => {
  const testFile = path.join(__dirname, 'test-chunk.dirty');
  let db: any;

  beforeEach(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  afterEach(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  it('should buffer partial lines correctly when chunk ends without newline', (done) => {
    // Create a test file with a chunk that doesn't end with newline
    // This tests the specific mutation where lastIndexOf('\n') was changed to lastIndexOf("")
    const testData = '{"key":"test","val":"data"}';
    fs.writeFileSync(testFile, testData);

    db = new Dirty(testFile);

    let loadCalled = false;
    db.on('load', (length: number) => {
      loadCalled = true;
      // Original code should not process this as it's an incomplete line
      // It should be buffered and not cause an error
      expect(length).toBe(0);
    });

    db.on('error', (err: Error) => {
      if (loadCalled) {
        // Original code should not emit error for incomplete line at end
        done(new Error('Original code should not emit error for incomplete line'));
      } else {
        // Mutated code will fail here because it checks for empty string
        // which will always be true, causing it to try processing incomplete lines
        done();
      }
    });

    // Give some time for the events to process
    setTimeout(() => {
      if (!loadCalled) {
        done(new Error('Load event should have been called'));
      }
    }, 100);
  });
});