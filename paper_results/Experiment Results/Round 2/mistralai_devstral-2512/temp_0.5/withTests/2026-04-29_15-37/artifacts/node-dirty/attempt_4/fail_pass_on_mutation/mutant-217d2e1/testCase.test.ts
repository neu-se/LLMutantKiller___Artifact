import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('corrupted row handling', () => {
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

  it('should not return unexpected values from corrupted row handling', (done) => {
    // Create a file with a corrupted row
    const corruptedData = '{"key":"test","val":"value"}\n{"corrupted":"data"\n{"key":"test2","val":"value2"}\n';
    fs.writeFileSync(testFile, corruptedData, 'utf-8');

    const db = new Dirty(testFile);
    let errorReceived = false;

    db.on('error', (err) => {
      errorReceived = true;
      // The original code returns empty string, mutated returns "Stryker was here!"
      // This will fail on mutated code because the return value is different
      expect(err.message).toBe('Could not load corrupted row: {"corrupted":"data"');
    });

    db.on('load', (size) => {
      expect(errorReceived).toBe(true);
      expect(size).toBe(2);
      done();
    });
  });
});