import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty database chunk processing with newline check', () => {
  const testFile = path.join(__dirname, 'test-chunk.dirty');
  let db: any;

  beforeEach(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  afterEach(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  it('should process chunks with newlines correctly and buffer incomplete lines', (done) => {
    // Create a test file with multiple chunks where last one doesn't end with newline
    // This tests the specific mutation where lastIndexOf('\n') was changed to lastIndexOf("")
    const testData = '{"key":"test1","val":"data1"}\n{"key":"test2","val":"data2"}';
    fs.writeFileSync(testFile, testData);

    db = new Dirty(testFile);

    db.on('load', (length: number) => {
      // Original code should process first complete line and buffer the second incomplete one
      expect(db.get('test1')).toBe('data1');
      expect(db.get('test2')).toBeUndefined(); // Should be buffered as incomplete
      expect(length).toBe(1);
      done();
    });

    db.on('error', (err: Error) => {
      // Mutated code will fail here because it checks for empty string
      // which will always be true, causing it to try processing incomplete lines
      done(err);
    });
  });
});