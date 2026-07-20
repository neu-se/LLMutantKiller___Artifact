import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('mutant detection test', () => {
  const testFile = path.join(__dirname, 'test-mutant.dirty');
  let db: any;

  beforeEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  afterEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  it('should correctly handle chunks without newlines during load', (done) => {
    // Create a test file with multiple lines where the last line has no newline
    const testData = '{"key":"test1","val":"value1"}\n{"key":"test2","val":"value2"}';
    fs.writeFileSync(testFile, testData, 'utf-8');

    db = new Dirty(testFile);

    db.on('load', (size: number) => {
      try {
        // Should have loaded both records
        expect(size).toBe(2);
        expect(db.get('test1')).toBe('value1');
        expect(db.get('test2')).toBe('value2');
        done();
      } catch (error: any) {
        done(error);
      }
    });

    db.on('error', (err: Error) => {
      done(err);
    });
  });
});