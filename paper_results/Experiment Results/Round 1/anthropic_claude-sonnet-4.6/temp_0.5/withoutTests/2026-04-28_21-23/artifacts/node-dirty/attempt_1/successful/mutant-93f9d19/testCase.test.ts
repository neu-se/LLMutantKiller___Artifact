import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty - corrupted row at end of db', () => {
  it('should emit error event when there is a corrupted row at the end of the db file', (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-test-${Date.now()}-${Math.floor(Math.random() * 10000)}.db`);

    // Write a db file with a valid row followed by an incomplete/corrupted row (no trailing newline)
    const validRow = JSON.stringify({ key: 'foo', val: 'bar' }) + '\n';
    const corruptedTail = 'this is not valid json and has no newline';
    fs.writeFileSync(dbPath, validRow + corruptedTail, 'utf-8');

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
        expect(errorMessage).toContain('Corrupted row at the end of the db');
        fs.unlinkSync(dbPath);
        done();
      } catch (e) {
        fs.unlinkSync(dbPath);
        done(e);
      }
    });
  });
});