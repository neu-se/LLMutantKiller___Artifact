import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { rimraf } from 'rimraf';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty - row validation', () => {
  it('should emit an error when a row in the db file is missing the key field', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    // Write a db file with a row that has no 'key' field
    // This simulates a corrupted row that has valid JSON but no 'key' property
    const corruptedRow = JSON.stringify({ val: 'somevalue' }) + '\n';
    fs.writeFileSync(dbPath, corruptedRow, 'utf-8');

    const errors: Error[] = [];
    const db = new Dirty(dbPath);

    db.on('error', (err: Error) => {
      errors.push(err);
    });

    db.on('load', () => {
      // In the original code, the missing 'key' field should have triggered an error
      // In the mutated code, no error is emitted because the check is disabled
      try {
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].message).toContain('Could not load corrupted row');
        done();
      } catch (e) {
        done(e);
      } finally {
        db.close();
        rimraf(tmpDir).catch(() => {});
      }
    });
  });
});