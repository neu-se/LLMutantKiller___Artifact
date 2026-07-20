import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty database newline detection', () => {
  const testFile = path.join(__dirname, 'test-newline.dirty');
  let db: any;

  beforeEach(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  afterEach(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  it('should correctly detect newlines in data chunks', (done) => {
    // Create a test file with a chunk that contains a newline
    const testData = '{"key":"test","val":"data"}\n';
    fs.writeFileSync(testFile, testData);

    db = new Dirty(testFile);

    db.on('load', (length: number) => {
      // Original code should process this correctly
      expect(db.get('test')).toBe('data');
      expect(length).toBe(1);
      done();
    });

    db.on('error', (err: Error) => {
      // Mutated code will fail here because it checks for empty string
      // which will always be true, causing incorrect processing
      done(err);
    });
  });
});