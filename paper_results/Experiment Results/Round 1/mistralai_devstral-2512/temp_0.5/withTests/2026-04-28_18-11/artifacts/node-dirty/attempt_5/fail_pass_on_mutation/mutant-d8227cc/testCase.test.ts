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
    // Create a test file with a single line WITH newline at end
    const testData = '{"key":"test","val":"value"}\n';
    fs.writeFileSync(testFile, testData, 'utf-8');

    db = new Dirty(testFile);

    db.on('load', (size: number) => {
      try {
        // Should have loaded the one record
        expect(size).toBe(1);
        expect(db.get('test')).toBe('value');
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