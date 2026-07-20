import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty database empty line handling', () => {
  it('should emit an error with empty line message when loading a database file containing an empty line', (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-test-emptyline-${process.pid}.db`);

    // Create a database file with an empty line in it
    const fileContent = '{"key":"foo","val":"bar"}\n\n{"key":"baz","val":"qux"}\n';
    fs.writeFileSync(dbPath, fileContent, 'utf-8');

    const db = new Dirty(dbPath);
    let emptyLineErrorEmitted = false;

    db.on('error', (err: Error) => {
      if (err.message === 'Empty lines never appear in a healthy database') {
        emptyLineErrorEmitted = true;
      }
    });

    db.on('load', () => {
      try {
        fs.unlinkSync(dbPath);
      } catch (e) {
        // ignore cleanup errors
      }

      // Original code emits error with this specific message for empty lines
      // Mutated code (if (false)) skips this check, so the error is never emitted
      expect(emptyLineErrorEmitted).toBe(true);
      done();
    });
  });
});