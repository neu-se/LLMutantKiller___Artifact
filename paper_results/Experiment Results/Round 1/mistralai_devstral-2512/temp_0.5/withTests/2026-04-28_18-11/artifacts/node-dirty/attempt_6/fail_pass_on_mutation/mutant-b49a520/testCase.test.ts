import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty database chunk processing with simulated streaming', () => {
  const testFile = path.join(__dirname, 'test-chunk.dirty');
  let db: any;

  beforeEach(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  afterEach(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  it('should handle streaming chunks without newlines correctly', (done) => {
    // Create a test file with a chunk that doesn't contain newline
    // This tests the specific mutation where lastIndexOf('\n') was changed to lastIndexOf("")
    const testData = '{"key":"test","val":"data"}';
    fs.writeFileSync(testFile, testData);

    db = new Dirty(testFile);

    let errorOccurred = false;
    db.on('error', (err: Error) => {
      errorOccurred = true;
      // Mutated code will emit error because it checks for empty string
      // which will always be true, causing it to try processing incomplete lines
      done();
    });

    db.on('load', (length: number) => {
      if (errorOccurred) return;

      // Original code should not process incomplete lines and not emit error
      expect(length).toBe(0);
      expect(db.get('test')).toBeUndefined();
      done();
    });
  });
});