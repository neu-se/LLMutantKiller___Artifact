import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty loading row without key property', () => {
  it('should emit an error event when loading a row that has no key field', (done) => {
    const filePath = path.join(os.tmpdir(), `test-no-key-mutant-${process.pid}.dirty`);

    // Write a row that has no 'key' field
    fs.writeFileSync(filePath, JSON.stringify({ val: 'some value' }) + '\n', 'utf-8');

    const db = new Dirty(filePath);

    let errorEmitted = false;

    db.on('error', (err: Error) => {
      errorEmitted = true;
    });

    db.on('load', () => {
      try { fs.unlinkSync(filePath); } catch (e) { /* ignore */ }
      expect(errorEmitted).toBe(true);
      done();
    });
  });
});