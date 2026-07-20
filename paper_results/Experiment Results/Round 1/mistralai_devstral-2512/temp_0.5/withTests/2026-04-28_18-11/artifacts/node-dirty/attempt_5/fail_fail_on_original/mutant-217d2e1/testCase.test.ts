// testCase.test.ts
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('dirty database error handling', () => {
  const testFile = path.join(__dirname, 'tmp', 'mutant-217d2e1-test.dirty');
  const corruptedData = '{"key":"test","val":"value"}\n{"invalid json\n{"key":"after","val":"data"}';

  beforeAll(() => {
    fs.mkdirSync(path.dirname(testFile), { recursive: true });
    fs.writeFileSync(testFile, corruptedData);
  });

  afterAll(() => {
    fs.rmSync(path.dirname(testFile), { recursive: true, force: true });
  });

  it('should handle corrupted row error correctly', (done) => {
    const db = new Dirty(testFile);
    let errorCount = 0;

    db.on('error', (err) => {
      errorCount++;
      // The mutation changes the return value in the error handling path
      // This test verifies the error is emitted correctly
      expect(err).toBeInstanceOf(Error);
    });

    db.on('load', () => {
      // If we reach load without error, the test fails
      done(new Error('Expected error event but got load event'));
    });

    // Give some time for error to be emitted
    setTimeout(() => {
      expect(errorCount).toBeGreaterThan(0);
      done();
    }, 100);
  });
});