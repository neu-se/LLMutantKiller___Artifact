import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

describe('dirty db empty line handling', () => {
  it('should emit error event on the error channel when an empty line is encountered during load', (done) => {
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

    const dbFile = path.join(os.tmpdir(), `dirty-test-empty-${process.pid}-${Date.now()}.dirty`);

    // Create a db file with a blank line between two valid records
    // The blank line should trigger an error in the original code
    fs.writeFileSync(dbFile, '{"key":"a","val":1}\n\n{"key":"b","val":2}\n', 'utf-8');

    const errors: Error[] = [];

    const db = new Dirty(dbFile);

    db.on('error', (err: Error) => {
      errors.push(err);
    });

    db.on('load', () => {
      fs.unlinkSync(dbFile);
      // Original code: emits 'error' with "Empty lines never appear..." message
      // Mutated code: never emits 'error' for empty lines (uses if(false))
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].message).toMatch(/Empty lines never appear/);
      done();
    });
  });
});