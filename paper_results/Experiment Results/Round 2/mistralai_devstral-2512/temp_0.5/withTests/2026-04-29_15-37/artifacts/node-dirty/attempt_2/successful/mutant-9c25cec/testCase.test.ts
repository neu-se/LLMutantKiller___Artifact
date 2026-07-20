import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('mutant-9c25cec test case', () => {
  const testFile = path.join(__dirname, 'test-mutant.dirty');
  const testData = '{"val":"data"}\n{"key":"another","val":"value"}\n';

  beforeAll(() => {
    fs.writeFileSync(testFile, testData);
  });

  afterAll(() => {
    rimraf.sync(testFile);
  });

  it('should emit error for rows without key property', (done) => {
    const db = new Dirty(testFile);
    db.on('error', (err) => {
      expect(err.message).toContain('Could not load corrupted row');
      done();
    });
  });
});