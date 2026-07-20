import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty corrupted row at end of file', () => {
  it('should emit an error when there is corrupted data at the end of the database file', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    // Write a valid row followed by corrupted data (no trailing newline)
    // The corrupted part has no newline so it stays in the buffer when 'end' event fires
    const validRow = JSON.stringify({ key: 'foo', val: 'bar' }) + '\n';
    const corruptedData = 'this is not valid json and has no newline';
    fs.writeFileSync(dbPath, validRow + corruptedData);

    const db = new Dirty(dbPath);
    let errorEmitted = false;

    db.on('error', (err: Error) => {
      if (err.message.includes('Corrupted row at the end of the db')) {
        errorEmitted = true;
      }
    });

    db.on('load', () => {
      try {
        expect(errorEmitted).toBe(true);
      } catch (e) {
        // Clean up temp dir
        try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
        done(e);
        return;
      }
      try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
      done();
    });
  });
});