import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('corrupted row handling', () => {
  const testFile = path.join(__dirname, 'tmp', 'corrupted-test.dirty');
  const testDir = path.dirname(testFile);

  beforeAll(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterAll(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  it('should handle corrupted rows and verify exact error message', (done) => {
    // Create a file with a corrupted row
    const corruptedData = '{"key":"test","val":"value"}\n{"corrupted":"data"\n{"key":"test2","val":"value2"}\n';
    fs.writeFileSync(testFile, corruptedData, 'utf-8');

    const db = new Dirty(testFile);
    let errorMessage = '';

    db.on('error', (err) => {
      errorMessage = err.message;
    });

    db.on('load', (size) => {
      // The original code returns empty string, mutated returns "Stryker was here!"
      // This will fail on mutated code because the error message will be different
      expect(errorMessage).toBe('Could not load corrupted row: {"corrupted":"data"');
      expect(size).toBe(2);
      done();
    });
  });
});