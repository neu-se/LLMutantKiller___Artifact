import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty database empty line handling', () => {
  it('should emit an error event when an empty line is encountered in the database file', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    // Create a database file with an empty line in it
    const validRow = JSON.stringify({ key: 'foo', val: 'bar' }) + '\n';
    const emptyLine = '\n';
    const anotherValidRow = JSON.stringify({ key: 'baz', val: 'qux' }) + '\n';

    fs.writeFileSync(dbPath, validRow + emptyLine + anotherValidRow, 'utf-8');

    const db = new Dirty(dbPath);

    let errorEmitted = false;

    db.on('error', (_err: Error) => {
      errorEmitted = true;
    });

    db.on('load', () => {
      // Clean up temp files
      try {
        fs.unlinkSync(dbPath);
        fs.rmdirSync(tmpDir);
      } catch (_e) {
        // ignore cleanup errors
      }

      expect(errorEmitted).toBe(true);
      done();
    });
  });
});