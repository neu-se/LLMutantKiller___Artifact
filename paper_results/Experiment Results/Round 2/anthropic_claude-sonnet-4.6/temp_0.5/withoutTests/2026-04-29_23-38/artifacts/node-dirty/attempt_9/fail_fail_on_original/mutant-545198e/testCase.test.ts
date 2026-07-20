import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty', () => {
  it('should not emit error for empty lines when processing chunks without newlines', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    // Create content where a chunk boundary will fall such that
    // a chunk contains only part of a JSON line with no newline
    // Use highWaterMark to control chunk size
    const chunkSize = 16;
    const rec = JSON.stringify({ key: 'ab', val: 'cd' }) + '\n';
    // rec is: {"key":"ab","val":"cd"}\n = 25 chars
    // With chunkSize=16, first chunk: {"key":"ab","val" (no newline)
    // second chunk: :"cd"}\n (has newline)
    
    fs.writeFileSync(dbPath, rec, 'utf-8');

    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    
    // Monkey-patch createReadStream to use small highWaterMark
    const origCreateReadStream = fs.createReadStream;
    (fs as any).createReadStream = (path: string, opts: any) => {
      return origCreateReadStream(path, { ...opts, highWaterMark: chunkSize });
    };
    
    const db = new Dirty(dbPath);
    (fs as any).createReadStream = origCreateReadStream;
    
    const errors: Error[] = [];
    db.on('error', (err: Error) => { errors.push(err); });
    db.on('load', (count: number) => {
      try {
        expect(errors).toHaveLength(0);
        expect(count).toBe(1);
        expect(db.get('ab')).toBe('cd');
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done();
      } catch (e) {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done(e);
      }
    });
  });
});