import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
// @ts-ignore
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty corrupted row error handling', () => {
  it('should emit an error event when a corrupted row is encountered during load', (done) => {
    const tmpDir = os.tmpdir();
    const dbFile = path.join(tmpDir, `test-corrupted-${process.pid}-${Math.floor(Math.random() * 1000000)}.dirty`);

    // Write a file with a valid row followed by a corrupted (non-JSON) row
    const validRow = JSON.stringify({ key: 'goodKey', val: 'goodValue' }) + '\n';
    const corruptedRow = 'this is not valid json\n';
    fs.writeFileSync(dbFile, validRow + corruptedRow, 'utf-8');

    const db = new Dirty(dbFile);
    let errorEmitted = false;

    db.on('error', (err: Error) => {
      errorEmitted = true;
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toContain('Could not load corrupted row');
      try { fs.unlinkSync(dbFile); } catch (_) { /* ignore */ }
      done();
    });

    db.on('load', () => {
      if (!errorEmitted) {
        try { fs.unlinkSync(dbFile); } catch (_) { /* ignore */ }
        done(new Error('Expected error event to be emitted for corrupted row, but it was not'));
      }
    });
  });
});