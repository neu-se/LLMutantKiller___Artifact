import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty corrupted row error handling', () => {
  it('should emit error event with message when a corrupted row is encountered during load', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    // Write a corrupted row (invalid JSON) to the database file
    fs.writeFileSync(dbPath, 'this is not valid json\n', 'utf-8');

    const db = new Dirty(dbPath);

    let errorEmitted = false;
    let errorMessage = '';

    db.on('error', (err: Error) => {
      errorEmitted = true;
      errorMessage = err.message;
    });

    db.on('load', () => {
      try {
        expect(errorEmitted).toBe(true);
        expect(errorMessage).toContain('Could not load corrupted row');
        expect(errorMessage).toContain('this is not valid json');
      } finally {
        db.close();
        try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}
        done();
      }
    });
  });
});