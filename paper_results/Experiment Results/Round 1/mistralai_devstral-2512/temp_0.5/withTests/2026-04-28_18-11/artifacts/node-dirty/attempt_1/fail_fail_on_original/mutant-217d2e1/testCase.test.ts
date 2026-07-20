// testCase.test.ts
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('dirty database error handling', () => {
  const testFile = path.join(__dirname, 'tmp', 'mutant-217d2e1-test.dirty');
  const corruptedData = '{"key":"test","val":"value"}\n{"key":"corrupted","val":\n{"key":"after","val":"data"}';

  beforeAll(() => {
    fs.mkdirSync(path.dirname(testFile), { recursive: true });
    fs.writeFileSync(testFile, corruptedData);
  });

  afterAll(() => {
    rimraf.sync(path.dirname(testFile));
  });

  it('should emit error for corrupted row and not return modified string', (done) => {
    const db = new Dirty(testFile);
    db.on('error', (err) => {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toContain('Could not load corrupted row');
      expect(err.message).not.toContain('Stryker was here!');
      done();
    });
  });
});