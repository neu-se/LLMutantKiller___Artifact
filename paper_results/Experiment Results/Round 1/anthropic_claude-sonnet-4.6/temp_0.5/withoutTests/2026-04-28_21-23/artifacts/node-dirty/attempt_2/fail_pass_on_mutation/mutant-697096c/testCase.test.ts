import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty empty line handling', () => {
  it('should emit an error when the database file contains an empty line', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    // Create a database file with an empty line in it
    const validRow1 = JSON.stringify({ key: 'foo', val: 'bar' }) + '\n';
    const emptyLine = '\n';
    const validRow2 = JSON.stringify({ key: 'baz', val: 'qux' }) + '\n';
    fs.writeFileSync(dbPath, validRow1 + emptyLine + validRow2, 'utf-8');

    const db = new Dirty(dbPath);
    let errorEmitted = false;

    db.on('error', (_err: Error) => {
      errorEmitted = true;
    });

    db.on('load', () => {
      try {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      } catch (_e) {
        // ignore cleanup errors
      }
      expect(errorEmitted).toBe(true);
      done();
    });
  });
});