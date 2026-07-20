import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty database chunk processing with newline', () => {
  const testFile = path.join(__dirname, 'test-chunk.dirty');
  let db: any;

  beforeEach(() => {
    // Clean up test file if it exists
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  afterEach(() => {
    // Clean up test file
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  it('should process data chunks with newlines correctly', (done) => {
    // Create a test file with a chunk that contains a newline
    const testData = '{"key":"test","val":"data"}\n';
    fs.writeFileSync(testFile, testData);

    db = new Dirty(testFile);
    db.on('load', (length: number) => {
      // The original code will process this correctly
      // The mutated code will fail because it checks for empty string instead of newline
      expect(db.get('test')).toBe('data');
      expect(length).toBe(1);
      done();
    });

    db.on('error', (err: Error) => {
      done(err);
    });
  });
});