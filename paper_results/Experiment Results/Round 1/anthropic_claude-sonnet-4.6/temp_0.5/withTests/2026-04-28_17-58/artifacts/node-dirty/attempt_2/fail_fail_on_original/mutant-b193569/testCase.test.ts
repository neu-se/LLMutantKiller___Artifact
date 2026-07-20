import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty corrupted row at end of file', () => {
  it('should emit an error event when there is a corrupted row at the end of the db file', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const filePath = path.join(tmpDir, 'corrupted.dirty');

    // Write a valid row followed by an incomplete row with no trailing newline.
    // The incomplete row will remain in the buffer after reading and should trigger an error.
    const validRow = JSON.stringify({ key: 'foo', val: 'bar' }) + '\n';
    const corruptedTrailing = '{"key":"incomplete'; // No newline - stays in buffer
    fs.writeFileSync(filePath, validRow + corruptedTrailing, 'utf-8');

    const db = new Dirty(filePath);

    db.on('error', (err: Error) => {
      expect(err.message).toContain('Corrupted row at the end of the db');
      try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
      done();
    });

    db.on('load', () => {
      try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
      done(new Error('Expected error event for corrupted trailing row, but load fired without error'));
    });
  });
});