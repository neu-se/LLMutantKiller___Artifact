import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('mutant detection test', () => {
  const testFile = path.join(__dirname, 'test-mutant.dirty');
  const corruptedData = '{"val":"data"}\n{"key":"valid","val":"value"}\n';

  beforeAll(() => {
    fs.writeFileSync(testFile, corruptedData);
  });

  afterAll(() => {
    rimraf.sync(testFile);
  });

  it('should emit error when loading row without key property', (done) => {
    const db = new Dirty(testFile);
    db.on('error', (err) => {
      expect(err.message).toContain('Could not load corrupted row');
      done();
    });
  });
});