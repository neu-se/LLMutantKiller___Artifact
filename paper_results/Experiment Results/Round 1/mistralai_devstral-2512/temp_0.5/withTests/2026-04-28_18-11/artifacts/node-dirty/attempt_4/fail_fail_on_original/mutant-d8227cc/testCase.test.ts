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
    // Create a test file with a single line (no newline at end)
    const testData = '{"key":"test","val":"value"}';
    fs.writeFileSync(testFile, testData, 'utf-8');

    db = new Dirty(testFile);

    let loadCalled = false;
    let errorCalled = false;

    db.on('load', (size: number) => {
      if (loadCalled) return;
      loadCalled = true;

      try {
        // Should have loaded the one record
        expect(size).toBe(1);
        expect(db.get('test')).toBe('value');
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
      done(err);
    });

    // Timeout to prevent hanging
    setTimeout(() => {
      if (!loadCalled && !errorCalled) {
        done(new Error('Test timed out - neither load nor error event was fired'));
      }
    }, 1000);
  });
});