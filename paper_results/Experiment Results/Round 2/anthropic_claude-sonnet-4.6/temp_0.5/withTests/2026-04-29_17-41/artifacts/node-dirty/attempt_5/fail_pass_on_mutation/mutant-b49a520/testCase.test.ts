import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('dirty db multi-chunk loading', () => {
  it('should correctly load records from a large file requiring multiple read chunks', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-mutant-test-${process.pid}.dirty`);

    // Create a file with a very large value that exceeds typical chunk size (64KB)
    // This forces the record to span multiple chunks
    const largeValue = 'x'.repeat(128 * 1024); // 128KB value
    const row1 = JSON.stringify({ key: 'small', val: 'value' }) + '\n';
    const row2 = JSON.stringify({ key: 'large', val: largeValue }) + '\n';
    const row3 = JSON.stringify({ key: 'after', val: 'end' }) + '\n';
    
    fs.writeFileSync(file, row1 + row2 + row3, 'utf-8');

    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(file);

    db.on('load', (length: number) => {
      try { fs.unlinkSync(file); } catch (_) {}
      expect(length).toBe(3);
      expect(db.get('small')).toBe('value');
      expect(db.get('large')).toBe(largeValue);
      expect(db.get('after')).toBe('end');
      done();
    });

    db.on('error', (err: Error) => {
      try { fs.unlinkSync(file); } catch (_) {}
      done(err);
    });
  });
});