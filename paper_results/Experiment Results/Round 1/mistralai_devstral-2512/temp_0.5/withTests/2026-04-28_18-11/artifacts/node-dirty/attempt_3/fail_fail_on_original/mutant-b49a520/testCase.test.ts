import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty database chunk processing without newline', () => {
  const testFile = path.join(__dirname, 'test-chunk.dirty');
  let db: any;

  beforeEach(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  afterEach(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  it('should handle chunks without newline characters', (done) => {
    // Create a test file with multiple chunks where the last one doesn't end with newline
    const testData = '{"key":"test1","val":"data1"}\n{"key":"test2","val":"data2"}';
    fs.writeFileSync(testFile, testData);

    db = new Dirty(testFile);
    db.on('load', (length: number) => {
      // Original code should process both entries correctly
      expect(db.get('test1')).toBe('data1');
      expect(db.get('test2')).toBe('data2');
      expect(length).toBe(2);
      done();
    });

    db.on('error', (err: Error) => {
      // Mutated code will fail here because it won't properly handle the chunk without newline
      done(err);
    });
  });
});