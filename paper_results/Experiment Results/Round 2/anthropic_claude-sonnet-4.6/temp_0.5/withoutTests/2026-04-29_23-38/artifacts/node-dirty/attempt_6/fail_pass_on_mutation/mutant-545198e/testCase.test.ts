import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty', () => {
  it('should handle multi-chunk loading where second chunk has no newline', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    // We need: first chunk ends with partial second record (no trailing newline in second chunk)
    // Default read chunk size is 65536 bytes
    // First record fills most of first chunk, second record spans the boundary
    const chunkSize = 65536;
    
    // First record: pad to make first chunk end mid-second-record
    // Record 1: small, Record 2: spans chunk boundary with no newline in second chunk
    const rec1 = JSON.stringify({ key: 'first', val: 'v1' }) + '\n';
    // Pad to push second record across chunk boundary
    const padSize = chunkSize - rec1.length - 10; // second record starts near end of first chunk
    const rec1padded = JSON.stringify({ key: 'first', val: 'v1' + 'p'.repeat(padSize) }) + '\n';
    const rec2 = JSON.stringify({ key: 'second', val: 'v2' }) + '\n';
    
    const content = rec1padded + rec2;
    fs.writeFileSync(dbPath, content, 'utf-8');

    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(dbPath);
    const errors: Error[] = [];

    db.on('error', (err: Error) => { errors.push(err); });
    db.on('load', (count: number) => {
      try {
        expect(errors).toHaveLength(0);
        expect(count).toBe(2);
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done();
      } catch (e) {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done(e);
      }
    });
  });
});