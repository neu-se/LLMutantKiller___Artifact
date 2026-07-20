import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty corrupted row at end of file', () => {
  it('should emit an error when the db file has a corrupted row at the end (no trailing newline)', (done) => {
    const tmpDir = os.tmpdir();
    const filePath = path.join(tmpDir, `dirty-test-corrupted-${Date.now()}.dirty`);

    // Write a valid row followed by an incomplete/corrupted row (no trailing newline)
    // The valid row ends with \n, but the last partial content has no \n
    // This simulates a corrupted row at the end of the file
    const validRow = JSON.stringify({ key: 'foo', val: 'bar' }) + '\n';
    const corruptedPartial = 'this is corrupted data without newline';
    fs.writeFileSync(filePath, validRow + corruptedPartial, 'utf-8');

    const db = new (Dirty as any)(filePath);

    let errorEmitted = false;

    db.on('error', (err: Error) => {
      errorEmitted = true;
      expect(err.message).toContain('Corrupted row at the end of the db');
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