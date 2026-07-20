import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('corrupted row error message', () => {
  const testFile = path.join(__dirname, 'tmp', 'corrupted-test.dirty');
  const testDir = path.dirname(testFile);

  beforeAll(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterAll(() => {
    rimraf.sync(testDir);
  });

  it('should emit error with correct message for corrupted row', (done) => {
    // Create a file with a corrupted row
    const corruptedData = '{"key":"test","val":"value"}\n{"corrupted":"data"\n{"key":"test2","val":"value2"}\n';
    fs.writeFileSync(testFile, corruptedData, 'utf-8');

    const db = new Dirty(testFile);

    db.on('error', (err) => {
      // This assertion will fail on the mutated code because the error message will contain "Stryker was here!"
      expect(err.message).toBe('Could not load corrupted row: {"corrupted":"data"');
      done();
    });
  });
});