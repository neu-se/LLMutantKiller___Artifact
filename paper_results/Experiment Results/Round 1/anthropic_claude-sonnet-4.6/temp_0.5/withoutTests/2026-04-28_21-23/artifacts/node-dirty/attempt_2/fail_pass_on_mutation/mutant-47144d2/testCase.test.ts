import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty database loading with empty lines', () => {
  it('should emit an error when loading a database file containing an empty line', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    // Create a database file with an empty line (two newlines in a row)
    // A valid row followed by an empty line
    const validRow = JSON.stringify({ key: 'testKey', val: 'testValue' }) + '\n';
    const emptyLine = '\n'; // This creates an empty row when split by '\n'
    fs.writeFileSync(dbPath, validRow + emptyLine, 'utf-8');

    const db = new Dirty(dbPath);

    let errorEmitted = false;

    db.on('error', (err: Error) => {
      errorEmitted = true;
    });

    db.on('load', () => {
      setImmediate(() => {
        try {
          fs.rmSync(tmpDir, { recursive: true, force: true });
        } catch (e) {
          // ignore cleanup errors
        }
        expect(errorEmitted).toBe(true);
        done();
      });
    });
  });
});