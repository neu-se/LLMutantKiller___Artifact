import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty corrupted row at end of file', () => {
  it('should emit an error when the db file has a corrupted row at the end (no trailing newline)', (done) => {
    const tmpDir = os.tmpdir();
    const filePath = path.join(tmpDir, `dirty-test-corrupted-${process.pid}.dirty`);

    // Write a valid row followed by an incomplete/corrupted row (no trailing newline)
    // The buffer will contain the partial content after the last \n
    const validRow = JSON.stringify({ key: 'foo', val: 'bar' }) + '\n';
    const corruptedPartial = 'this is corrupted data without newline';
    fs.writeFileSync(filePath, validRow + corruptedPartial, 'utf-8');

    const db = new Dirty(filePath);

    let errorEmitted = false;

    db.on('error', (err: Error) => {
      errorEmitted = true;
    });

    db.on('load', () => {
      try {
        fs.unlinkSync(filePath);
      } catch (e) { /* ignore */ }
      expect(errorEmitted).toBe(true);
      done();
    });
  });
});