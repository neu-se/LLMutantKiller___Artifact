import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty database loading with empty lines', () => {
  it('should emit an error with message about empty lines when loading a db file with an empty line', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    // Create a database file with an empty line between two valid rows
    const row1 = JSON.stringify({ key: 'key1', val: 'val1' }) + '\n';
    const emptyLine = '\n';
    const row2 = JSON.stringify({ key: 'key2', val: 'val2' }) + '\n';
    fs.writeFileSync(dbPath, row1 + emptyLine + row2, 'utf-8');

    const db = new Dirty(dbPath);

    const errors: string[] = [];

    db.on('error', (err: Error) => {
      errors.push(err.message);
    });

    db.on('load', () => {
      setImmediate(() => {
        try {
          fs.rmSync(tmpDir, { recursive: true, force: true });
        } catch (e) {
          // ignore cleanup errors
        }
        expect(errors.length).toBeGreaterThan(0);
        expect(errors.some(msg => msg.includes('Empty lines never appear in a healthy database'))).toBe(true);
        done();
      });
    });
  });
});