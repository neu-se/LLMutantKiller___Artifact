import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { rimraf } from 'rimraf';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty corrupted row at end of file', () => {
  it('should emit an error when there is corrupted data at the end of the database file', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    // Write a valid row followed by corrupted data (no trailing newline)
    // The valid row ends with \n, but the corrupted part has no newline
    // so it stays in the buffer when 'end' event fires
    const validRow = JSON.stringify({ key: 'foo', val: 'bar' }) + '\n';
    const corruptedData = 'this is not valid json and has no newline';
    fs.writeFileSync(dbPath, validRow + corruptedData);

    const db = new Dirty(dbPath);

    db.on('error', (err: Error) => {
      expect(err.message).toContain('Corrupted row at the end of the db');
      db.close();
      rimraf(tmpDir).then(() => done()).catch(done);
    });

    db.on('load', () => {
      // If we reach 'load' without an error, the mutation is present
      // (the corrupted buffer was silently ignored)
      db.close();
      rimraf(tmpDir).then(() => {
        done(new Error('Expected an error for corrupted data at end of file, but none was emitted'));
      }).catch(done);
    });
  });
});