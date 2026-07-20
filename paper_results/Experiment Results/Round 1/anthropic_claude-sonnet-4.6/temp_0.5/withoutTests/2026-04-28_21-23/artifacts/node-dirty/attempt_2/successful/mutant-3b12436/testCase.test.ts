import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty database row validation', () => {
  it('should emit an error when a row is missing the key property', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    // Write a row without a 'key' property to the database file
    const invalidRow = JSON.stringify({ val: 'somevalue' }) + '\n';
    fs.writeFileSync(dbPath, invalidRow, 'utf-8');

    const db = new Dirty(dbPath);

    let errorEmitted = false;

    db.on('error', () => {
      errorEmitted = true;
    });

    db.on('load', () => {
      try {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      } catch (_) {}

      if (!errorEmitted) {
        done(new Error('Expected an error event to be emitted for a row missing the key property'));
      } else {
        done();
      }
    });
  });
});