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

  it('should emit specific error message for corrupted row', (done) => {
    const db = new Dirty(testFile);
    db.on('error', (err) => {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toMatch(/Could not load corrupted row/);
      done();
    });
  });
});