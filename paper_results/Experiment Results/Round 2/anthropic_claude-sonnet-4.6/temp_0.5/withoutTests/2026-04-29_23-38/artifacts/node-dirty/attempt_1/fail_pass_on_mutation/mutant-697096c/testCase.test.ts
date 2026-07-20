import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty database empty line handling', () => {
  it('should emit an error when loading a database file containing an empty line', (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-test-${Date.now()}-${Math.floor(Math.random() * 10000)}.db`);

    // Create a database file with an empty line in it
    // Valid row, then empty line, then another valid row
    const fileContent = '{"key":"foo","val":"bar"}\n\n{"key":"baz","val":"qux"}\n';
    fs.writeFileSync(dbPath, fileContent, 'utf-8');

    const db = new Dirty(dbPath);
    let errorEmitted = false;

    db.on('error', (err: Error) => {
      errorEmitted = true;
    });

    db.on('load', () => {
      // Clean up
      try {
        fs.unlinkSync(dbPath);
      } catch (e) {
        // ignore cleanup errors
      }

      // In the original code, the empty line should trigger an error
      expect(errorEmitted).toBe(true);
      done();
    });
  });
});