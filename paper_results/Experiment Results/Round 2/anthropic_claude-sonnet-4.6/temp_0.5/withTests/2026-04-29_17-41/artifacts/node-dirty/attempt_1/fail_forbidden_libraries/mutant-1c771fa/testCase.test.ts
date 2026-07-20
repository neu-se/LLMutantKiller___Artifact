import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty corrupted row error handling', () => {
  it('should emit an error event when a corrupted row is encountered during load', (done) => {
    const tmpDir = os.tmpdir();
    const dbFile = path.join(tmpDir, `test-corrupted-${Date.now()}.dirty`);

    // Write a file with a valid row followed by a corrupted row
    const validRow = JSON.stringify({ key: 'goodKey', val: 'goodValue' }) + '\n';
    const corruptedRow = 'this is not valid json\n';
    fs.writeFileSync(dbFile, validRow + corruptedRow, 'utf-8');

    const db = new Dirty(dbFile);

    db.on('error', (err: Error) => {
      try {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toContain('Could not load corrupted row');
        fs.unlinkSync(dbFile);
        done();
      } catch (assertionError) {
        fs.unlinkSync(dbFile);
        done(assertionError);
      }
    });

    db.on('load', () => {
      // If load fires without error event, the mutation is present (error was swallowed)
      try {
        fs.unlinkSync(dbFile);
      } catch (_) { /* ignore */ }
      done(new Error('Expected error event to be emitted for corrupted row, but it was not'));
    });
  });
});