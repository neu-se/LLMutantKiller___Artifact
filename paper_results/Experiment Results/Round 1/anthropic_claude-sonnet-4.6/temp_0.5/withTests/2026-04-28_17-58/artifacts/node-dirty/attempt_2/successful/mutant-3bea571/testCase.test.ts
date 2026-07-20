import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('empty line in database file', () => {
  it('should emit error event when an empty line is encountered during load', (done) => {
    const tmpDir = os.tmpdir();
    const dbFile = path.join(tmpDir, `test-empty-line-${process.pid}.dirty`);

    // Write a database file with an empty line in it
    // An empty line between valid records should trigger the error event
    const content = '{"key":"foo","val":"bar"}\n\n{"key":"baz","val":"qux"}\n';
    fs.writeFileSync(dbFile, content, 'utf-8');

    const db = new Dirty(dbFile);
    let errorEmitted = false;

    db.on('error', (_err: Error) => {
      errorEmitted = true;
    });

    db.on('load', () => {
      try {
        fs.unlinkSync(dbFile);
      } catch (e) {
        // ignore cleanup errors
      }

      expect(errorEmitted).toBe(true);
      done();
    });
  });
});