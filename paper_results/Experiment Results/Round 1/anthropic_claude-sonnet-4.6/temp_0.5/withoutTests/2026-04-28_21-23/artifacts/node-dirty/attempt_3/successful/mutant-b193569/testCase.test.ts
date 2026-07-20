import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty database corrupted trailing data', () => {
  it('should emit an error when there is corrupted data at the end of the database file (no trailing newline)', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    // Write a valid row followed by corrupted trailing data (no newline at end)
    const validRow = JSON.stringify({ key: 'foo', val: 'bar' }) + '\n';
    const corruptedTrailing = '{"key": "incomplete';
    fs.writeFileSync(dbPath, validRow + corruptedTrailing, 'utf-8');

    const db = new Dirty(dbPath);
    let errorEmitted = false;

    db.on('error', (err: Error) => {
      if (err.message.includes('Corrupted row at the end of the db')) {
        errorEmitted = true;
      }
    });

    db.on('load', () => {
      fs.rmSync(tmpDir, { recursive: true, force: true });
      if (errorEmitted) {
        done();
      } else {
        done(new Error('Expected an error for corrupted trailing data, but none was emitted'));
      }
    });
  });
});