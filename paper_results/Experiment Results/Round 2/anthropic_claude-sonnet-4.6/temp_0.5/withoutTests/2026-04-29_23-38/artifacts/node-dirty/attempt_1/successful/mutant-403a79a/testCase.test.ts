import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty empty line error message', () => {
  it('should emit an error with specific message when encountering empty lines in database file', (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `test-dirty-empty-line-${Date.now()}.db`);

    // Write a db file with an empty line in it (which indicates corruption)
    // A healthy database should not have empty lines
    const validRow = JSON.stringify({ key: 'testKey', val: 'testVal' });
    const fileContent = validRow + '\n\n'; // Second newline creates an empty line

    fs.writeFileSync(dbPath, fileContent, 'utf-8');

    const db = new Dirty(dbPath);
    let errorMessage: string | null = null;

    db.on('error', (err: Error) => {
      errorMessage = err.message;
    });

    db.on('load', () => {
      try {
        expect(errorMessage).not.toBeNull();
        expect(errorMessage).toBe('Empty lines never appear in a healthy database');
        
        // Clean up
        try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }
        done();
      } catch (e) {
        try { fs.unlinkSync(dbPath); } catch (err) { /* ignore */ }
        done(e);
      }
    });
  });
});