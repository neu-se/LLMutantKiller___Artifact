import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty database chunk processing with multiple chunks', () => {
  const testFile = path.join(__dirname, 'test-chunk.dirty');
  let db: any;

  beforeEach(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  afterEach(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  it('should process multiple chunks with partial lines correctly', (done) => {
    // Create a test file with multiple chunks where some don't end with newline
    // This specifically tests the mutation where lastIndexOf('\n') was changed to lastIndexOf("")
    const testData = '{"key":"test1","val":"data1"}\n{"key":"test2","val":"data2"}\n{"key":"test3","val":"data3"}';
    fs.writeFileSync(testFile, testData);

    db = new Dirty(testFile);

    db.on('load', (length: number) => {
      // Original code should process first two complete lines and buffer the third
      expect(db.get('test1')).toBe('data1');
      expect(db.get('test2')).toBe('data2');
      expect(db.get('test3')).toBeUndefined(); // Should not be processed as it's incomplete
      expect(length).toBe(2);
      done();
    });

    db.on('error', (err: Error) => {
      // Mutated code will fail here because it checks for empty string
      // which will always be true, causing it to try processing incomplete lines
      done(err);
    });
  });
});