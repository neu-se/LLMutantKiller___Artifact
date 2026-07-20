import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { rimraf } from 'rimraf';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty database empty line handling', () => {
  it('should emit an error event when an empty line is encountered in the database file', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    // Create a database file with an empty line in it
    // The empty line should trigger an error event
    const validRow = JSON.stringify({ key: 'foo', val: 'bar' }) + '\n';
    const emptyLine = '\n';
    const anotherValidRow = JSON.stringify({ key: 'baz', val: 'qux' }) + '\n';
    
    fs.writeFileSync(dbPath, validRow + emptyLine + anotherValidRow, 'utf-8');

    const db = new Dirty(dbPath);
    
    let errorEmitted = false;

    db.on('error', (err: Error) => {
      errorEmitted = true;
    });

    db.on('load', () => {
      // Clean up
      db.close();
      db.on('write_close', () => {
        rimraf(tmpDir).then(() => {
          expect(errorEmitted).toBe(true);
          done();
        }).catch(done);
      });
    });
  });
});