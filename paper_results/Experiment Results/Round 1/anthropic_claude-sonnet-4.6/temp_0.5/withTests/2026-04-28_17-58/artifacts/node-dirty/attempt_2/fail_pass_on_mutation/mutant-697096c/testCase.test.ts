import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('empty line handling in database file', () => {
  it('should emit an error event (not a different event) when loading a database file containing empty lines', (done) => {
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    
    const tmpDir = os.tmpdir();
    const dbFile = path.join(tmpDir, `test-empty-line-${process.pid}.dirty`);

    // Write a database file with an empty line in the middle
    const content = '{"key":"foo","val":"bar"}\n\n{"key":"baz","val":"qux"}\n';
    fs.writeFileSync(dbFile, content, 'utf-8');

    const db = new Dirty(dbFile);
    let errorEventEmitted = false;
    let emptyEventEmitted = false;

    db.on('error', () => {
      errorEventEmitted = true;
    });

    // The mutated code emits on "" event instead of "error"
    db.on('', () => {
      emptyEventEmitted = true;
    });

    db.on('load', () => {
      try { fs.unlinkSync(dbFile); } catch (e) { /* ignore */ }

      // Original: emits 'error' for empty lines
      // Mutated: never hits the empty-line check, falls through to JSON.parse('') 
      //          which throws and emits on "" event
      expect(errorEventEmitted).toBe(true);
      expect(emptyEventEmitted).toBe(false);
      done();
    });
  });
});