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
    // Create a test file with a chunk that doesn't contain newline
    const testData = '{"key":"test","val":"value"}';
    fs.writeFileSync(testFile, testData, 'utf-8');

    db = new Dirty(testFile);

    let loadCalled = false;
    let errorCalled = false;

    db.on('load', (size: number) => {
      if (loadCalled) return;
      loadCalled = true;

      try {
        // In the original code, this should trigger an error about corrupted row
        // because the chunk without newline will be left in buffer and trigger the error
        // In the mutated code, it will incorrectly process the chunk
        expect(size).toBe(0);
        done();
      } catch (error: any) {
        if (!errorCalled) {
          errorCalled = true;
          done(error);
        }
      }
    });

    db.on('error', (err: Error) => {
      if (errorCalled) return;
      errorCalled = true;
      // This is the expected behavior for original code
      expect(err.message).toContain('Corrupted row at the end of the db');
      done();
    });

    // Timeout to prevent hanging
    setTimeout(() => {
      if (!loadCalled && !errorCalled) {
        done(new Error('Test timed out'));
      }
    }, 1000);
  });
});