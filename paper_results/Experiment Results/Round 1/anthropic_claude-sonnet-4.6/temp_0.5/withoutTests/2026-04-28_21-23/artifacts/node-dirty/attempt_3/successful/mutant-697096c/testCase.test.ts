import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty empty line handling', () => {
  it('should emit error with empty line message when database file contains an empty line', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    // Create a database file with an empty line between valid rows
    const validRow1 = JSON.stringify({ key: 'foo', val: 'bar' }) + '\n';
    const emptyLine = '\n';
    const validRow2 = JSON.stringify({ key: 'baz', val: 'qux' }) + '\n';
    fs.writeFileSync(dbPath, validRow1 + emptyLine + validRow2, 'utf-8');

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
      // Original code emits error with this specific message for empty lines
      const hasEmptyLineError = errorMessages.some(msg =>
        msg.includes('Empty lines never appear in a healthy database')
      );
      expect(hasEmptyLineError).toBe(true);
      done();
    });
  });
});