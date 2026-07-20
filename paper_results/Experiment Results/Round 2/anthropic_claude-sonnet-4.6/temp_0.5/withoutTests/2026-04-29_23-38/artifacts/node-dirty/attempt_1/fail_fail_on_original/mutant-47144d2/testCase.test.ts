import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { rimraf } from 'rimraf';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty database empty line handling', () => {
  it('should emit an error when loading a database file containing empty lines', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    // Create a database file with an empty line between valid rows
    const validRow1 = JSON.stringify({ key: 'foo', val: 'bar' }) + '\n';
    const emptyLine = '\n'; // This is an empty line that should trigger an error
    const validRow2 = JSON.stringify({ key: 'baz', val: 'qux' }) + '\n';
    fs.writeFileSync(dbPath, validRow1 + emptyLine + validRow2);

    const db = new Dirty(dbPath);
    let errorEmitted = false;

    db.on('error', (err: Error) => {
      errorEmitted = true;
    });

    db.on('load', () => {
      // Clean up
      rimraf(tmpDir).then(() => {
        expect(errorEmitted).toBe(true);
        done();
      }).catch(done);
    });
  });
});