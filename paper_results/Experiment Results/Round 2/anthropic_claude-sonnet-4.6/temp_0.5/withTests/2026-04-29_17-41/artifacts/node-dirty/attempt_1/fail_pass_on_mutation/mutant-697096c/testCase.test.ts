import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('empty line handling in database file', () => {
  it('should emit an error when loading a database file containing empty lines', (done) => {
    const tmpDir = os.tmpdir();
    const dbFile = path.join(tmpDir, `test-empty-line-${Date.now()}.dirty`);

    // Write a db file with an empty line in it
    const content = '{"key":"foo","val":"bar"}\n\n{"key":"baz","val":"qux"}\n';
    fs.writeFileSync(dbFile, content, 'utf-8');

    const db = new (Dirty as any)(dbFile);
    let errorEmitted = false;

    db.on('error', () => {
      errorEmitted = true;
    });

    db.on('load', () => {
      try {
        fs.unlinkSync(dbFile);
      } catch (e) { /* ignore */ }
      
      expect(errorEmitted).toBe(true);
      done();
    });
  });
});