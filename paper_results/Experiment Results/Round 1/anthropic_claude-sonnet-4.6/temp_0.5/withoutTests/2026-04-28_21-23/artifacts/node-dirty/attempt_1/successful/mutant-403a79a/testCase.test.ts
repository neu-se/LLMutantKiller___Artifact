import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty empty line error message', () => {
  it('should emit an error with the correct message when an empty line is encountered in the database file', (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `test-dirty-${Date.now()}-${Math.random().toString(36).slice(2)}.db`);

    // Write a database file with an empty line (which indicates corruption)
    const validRow = JSON.stringify({ key: 'testKey', val: 'testVal' });
    const fileContent = validRow + '\n\n'; // The second \n creates an empty line

    fs.writeFileSync(dbPath, fileContent, 'utf-8');

    const db = new Dirty(dbPath);

    db.on('error', (err: Error) => {
      try {
        expect(err.message).toBe('Empty lines never appear in a healthy database');
        fs.unlinkSync(dbPath);
        done();
      } catch (e) {
        fs.unlinkSync(dbPath);
        done(e);
      }
    });

    db.on('load', () => {
      // If no error was emitted, the test should fail
      // but we handle cleanup here too
    });
  });
});