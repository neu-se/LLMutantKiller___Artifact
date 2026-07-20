import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('corrupted row return value', () => {
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

  it('should verify the exact return value from corrupted row handling', (done) => {
    // Create a file with a corrupted row
    const corruptedData = '{"key":"test","val":"value"}\n{"corrupted":"data"\n{"key":"test2","val":"value2"}\n';
    fs.writeFileSync(testFile, corruptedData, 'utf-8');

    // We need to intercept the internal _load method to check the return value
    const originalLoad = Dirty.prototype._load;
    let returnValue: any;

    Dirty.prototype._load = function() {
      const result = originalLoad.call(this);
      // The original code returns empty string, mutated returns "Stryker was here!"
      returnValue = result;
      return result;
    };

    const db = new Dirty(testFile);

    db.on('load', (size) => {
      // Verify the return value from the corrupted row handling
      expect(returnValue).toBe('');
      expect(size).toBe(2);
      done();
    });
  });
});