import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty empty line handling', () => {
  it('should emit error event (not empty string event) when an empty line is encountered in the database file', (done) => {
    // Create a temp directory and file
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    // Write a database file with an empty line in it
    // An empty line between two valid rows triggers the mutation
    const validRow1 = JSON.stringify({ key: 'foo', val: 'bar' }) + '\n';
    const emptyLine = '\n';
    const validRow2 = JSON.stringify({ key: 'baz', val: 'qux' }) + '\n';
    fs.writeFileSync(dbPath, validRow1 + emptyLine + validRow2);

    const db = new Dirty(dbPath);

    let errorEventFired = false;
    let emptyEventFired = false;

    db.on('error', (err: Error) => {
      errorEventFired = true;
    });

    db.on('', (err: Error) => {
      emptyEventFired = true;
    });

    db.on('load', () => {
      // Cleanup
      try {
        fs.unlinkSync(dbPath);
        fs.rmdirSync(tmpDir);
      } catch (e) {
        // ignore cleanup errors
      }

      // In original code: error event should fire, empty event should not
      // In mutated code: error event should NOT fire, empty event should fire
      expect(errorEventFired).toBe(true);
      expect(emptyEventFired).toBe(false);
      done();
    });
  });
});