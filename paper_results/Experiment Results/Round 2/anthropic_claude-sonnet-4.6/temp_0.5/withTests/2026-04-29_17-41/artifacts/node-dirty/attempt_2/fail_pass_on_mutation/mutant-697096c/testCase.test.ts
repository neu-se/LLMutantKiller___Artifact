import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('empty line handling in database file', () => {
  it('should emit an error when loading a database file containing an empty line', (done) => {
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    
    const tmpDir = os.tmpdir();
    const dbFile = path.join(tmpDir, `test-empty-line-mutant-${process.pid}.dirty`);

    // Write a db file with an empty line between valid records
    const content = '{"key":"foo","val":"bar"}\n\n{"key":"baz","val":"qux"}\n';
    fs.writeFileSync(dbFile, content, 'utf-8');

    const db = new Dirty(dbFile);
    let errorEmitted = false;

    db.on('error', () => {
      errorEmitted = true;
    });

    db.on('load', () => {
      try { fs.unlinkSync(dbFile); } catch (e) { /* ignore */ }
      expect(errorEmitted).toBe(true);
      done();
    });
  });
});