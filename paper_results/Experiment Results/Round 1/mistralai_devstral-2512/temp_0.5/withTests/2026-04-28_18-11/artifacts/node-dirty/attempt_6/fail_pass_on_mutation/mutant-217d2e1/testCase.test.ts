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

  it('should emit error for corrupted row', (done) => {
    const db = new Dirty(testFile);
    let errorEmitted = false;

    db.on('error', (err) => {
      errorEmitted = true;
      expect(err).toBeInstanceOf(Error);
    });

    db.on('load', () => {
      // The test should fail if no error was emitted for corrupted data
      if (!errorEmitted) {
        done(new Error('Expected error event for corrupted data'));
      } else {
        done();
      }
    });
  });
});