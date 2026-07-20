import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty database empty line handling', () => {
  it('should emit an error with "Empty lines" message when loading a database file containing empty lines', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    // Create a database file with an empty line between valid rows
    const validRow1 = JSON.stringify({ key: 'foo', val: 'bar' }) + '\n';
    const emptyLine = '\n'; // This is an empty line that should trigger an error
    const validRow2 = JSON.stringify({ key: 'baz', val: 'qux' }) + '\n';
    fs.writeFileSync(dbPath, validRow1 + emptyLine + validRow2);

    const db = new Dirty(dbPath);
    const errorMessages: string[] = [];

    db.on('error', (err: Error) => {
      errorMessages.push(err.message);
    });

    db.on('load', () => {
      try {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      } catch (_e) {
        // ignore cleanup errors
      }
      expect(errorMessages.some(msg => msg.includes('Empty lines never appear in a healthy database'))).toBe(true);
      done();
    });
  });
});