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

  it('should emit error message without return value modification', (done) => {
    const db = new Dirty(testFile);
    db.on('error', (err) => {
      expect(err).toBeInstanceOf(Error);
      // This test verifies the error message doesn't contain the mutant's return value
      // The mutation changes the return value from '' to "Stryker was here!"
      // This will appear in the error message if the mutation is present
      expect(err.message).not.toMatch(/Stryker was here!/);
      done();
    });
  });
});