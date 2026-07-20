import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty', () => {
  it('should handle chunks that do not end with newline', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    // Force a specific read chunk size by using a very large value that spans chunks
    // We need a chunk without newline to trigger the early return
    const largeVal = 'x'.repeat(65536); // larger than typical chunk size
    const content = JSON.stringify({ key: 'big', val: largeVal }) + '\n';
    fs.writeFileSync(dbPath, content, 'utf-8');

    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(dbPath);
    const errors: Error[] = [];

    db.on('error', (err: Error) => { errors.push(err); });
    db.on('load', (count: number) => {
      try {
        expect(errors).toHaveLength(0);
        expect(count).toBe(1);
        expect(db.get('big')).toBe(largeVal);
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done();
      } catch (e) {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done(e);
      }
    });
  });
});