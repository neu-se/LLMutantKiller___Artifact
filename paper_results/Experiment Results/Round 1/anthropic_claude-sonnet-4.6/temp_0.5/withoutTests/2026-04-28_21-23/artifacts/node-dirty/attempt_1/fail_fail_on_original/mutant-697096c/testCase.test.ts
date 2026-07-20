import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { rimraf } from 'rimraf';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty empty line handling', () => {
  it('should emit an error when the database file contains an empty line', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    // Create a database file with an empty line in it
    // A valid row followed by an empty line followed by another valid row
    const validRow1 = JSON.stringify({ key: 'foo', val: 'bar' }) + '\n';
    const emptyLine = '\n';
    const validRow2 = JSON.stringify({ key: 'baz', val: 'qux' }) + '\n';
    fs.writeFileSync(dbPath, validRow1 + emptyLine + validRow2, 'utf-8');

    const db = new Dirty(dbPath);
    let errorEmitted = false;

    db.on('error', (err: Error) => {
      errorEmitted = true;
    });

    db.on('load', () => {
      rimraf(tmpDir).then(() => {
        expect(errorEmitted).toBe(true);
        done();
      }).catch(done);
    });
  });
});