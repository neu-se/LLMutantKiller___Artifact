import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('dirty', () => {
  it('should emit a corrupted row error when file has no trailing newline', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-no-trail-${Date.now()}.dirty`);

    const row1 = JSON.stringify({ key: 'k1', val: 'v1' });
    const row2 = JSON.stringify({ key: 'k2', val: 'v2' });
    // No trailing newline - last row is incomplete from dirty's perspective
    fs.writeFileSync(file, `${row1}\n${row2}`, 'utf-8');

    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(file);

    const errors: Error[] = [];
    db.on('error', (err: Error) => errors.push(err));

    db.on('load', () => {
      try {
        expect(errors).toHaveLength(1);
        expect(errors[0].message).toMatch(/Corrupted row at the end/);
        // row1 should be loaded, row2 should not (it's the corrupted trailing content)
        expect(db.get('k1')).toBe('v1');
        fs.unlinkSync(file);
        done();
      } catch (err) {
        try { fs.unlinkSync(file); } catch (_) {}
        done(err);
      }
    });
  });
});