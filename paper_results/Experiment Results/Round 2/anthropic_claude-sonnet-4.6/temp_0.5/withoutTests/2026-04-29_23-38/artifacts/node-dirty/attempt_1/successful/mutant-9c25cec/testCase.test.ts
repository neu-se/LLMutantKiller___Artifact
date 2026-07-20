import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty - corrupted row without key property', () => {
  it('should emit an error when loading a row that has no key property', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    // Write a row without a 'key' property - this is valid JSON but missing the required 'key' field
    const corruptedRow = JSON.stringify({ val: 'somevalue' }) + '\n';
    fs.writeFileSync(dbPath, corruptedRow, 'utf-8');

    const db = new Dirty(dbPath);

    let errorEmitted = false;

    db.on('error', (err: Error) => {
      if (err.message.includes('Could not load corrupted row')) {
        errorEmitted = true;
      }
    });

    db.on('load', () => {
      // Clean up
      try {
        fs.unlinkSync(dbPath);
        fs.rmdirSync(tmpDir);
      } catch (e) {
        // ignore cleanup errors
      }

      expect(errorEmitted).toBe(true);
      done();
    });
  });
});