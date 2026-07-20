import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('dirty corrupted row at end of file', () => {
  it('should emit an error when there is a corrupted row at the end of the db file', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const filePath = path.join(tmpDir, 'corrupted.dirty');

    // Write a valid row followed by an incomplete/corrupted row (no trailing newline)
    // The incomplete row will remain in the buffer and should trigger an error
    const validRow = JSON.stringify({ key: 'foo', val: 'bar' }) + '\n';
    const corruptedRow = '{"key":"incomplete'; // No closing brace or newline - stays in buffer
    fs.writeFileSync(filePath, validRow + corruptedRow, 'utf-8');

    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(filePath);

    db.on('error', (err: Error) => {
      expect(err.message).toContain('Corrupted row at the end of the db');
      // Cleanup
      try {
        fs.rmSync(tmpDir, { recursive: true });
      } catch (e) { /* ignore */ }
      done();
    });

    db.on('load', () => {
      // If load fires without error, the mutation is present
      try {
        fs.rmSync(tmpDir, { recursive: true });
      } catch (e) { /* ignore */ }
      done(new Error('Expected an error event for corrupted row at end of file, but got load instead'));
    });
  });
});