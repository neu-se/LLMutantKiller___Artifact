import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('empty line handling in database file', () => {
  it('should emit the error event (not a blank event) when a database file contains an empty line', (done) => {
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

    const tmpDir = os.tmpdir();
    const dbFile = path.join(tmpDir, `test-empty-line-mutant-${process.pid}.dirty`);

    // Write a db file with an empty line between valid records
    const content = '{"key":"foo","val":"bar"}\n\n{"key":"baz","val":"qux"}\n';
    fs.writeFileSync(dbFile, content, 'utf-8');

    const db = new Dirty(dbFile);
    const errorMessages: Error[] = [];
    let blankEventEmitted = false;

    db.on('error', (err: Error) => {
      errorMessages.push(err);
    });

    // The mutated code emits on "" (empty string event) instead of "error"
    db.on('', () => {
      blankEventEmitted = true;
    });

    db.on('load', () => {
      try { fs.unlinkSync(dbFile); } catch (e) { /* ignore */ }
      // Original code emits 'error' event for empty lines
      // Mutated code emits '' event (falls through to JSON.parse which fails)
      expect(errorMessages.length).toBeGreaterThan(0);
      expect(errorMessages[0].message).toContain('Empty lines');
      done();
    });
  });
});