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

  it('should handle corrupted rows gracefully and not emit unexpected data', (done) => {
    // Create a file with a corrupted row
    const corruptedData = '{"key":"test","val":"value"}\n{"corrupted":"data"\n{"key":"test2","val":"value2"}\n';
    fs.writeFileSync(testFile, corruptedData, 'utf-8');

    const db = new Dirty(testFile);
    let errorCount = 0;
    let loadEventFired = false;

    db.on('error', (err) => {
      errorCount++;
      // The error should be about the corrupted row, not contain unexpected data
      expect(err.message).toContain('Could not load corrupted row');
      expect(err.message).not.toContain('Stryker was here!');
    });

    db.on('load', (size) => {
      loadEventFired = true;
      // Should have loaded 2 valid rows
      expect(size).toBe(2);
      expect(db.get('test')).toBe('value');
      expect(db.get('test2')).toBe('value2');
      expect(errorCount).toBeGreaterThan(0);
      done();
    });
  });
});