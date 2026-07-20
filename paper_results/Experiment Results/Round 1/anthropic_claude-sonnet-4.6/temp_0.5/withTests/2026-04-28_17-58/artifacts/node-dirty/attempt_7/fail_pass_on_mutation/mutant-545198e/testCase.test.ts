import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty', () => {
  it('should correctly load a record whose JSON spans multiple read chunks', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `test-dirty-multichunk-${process.pid}.dirty`);

    // Create a value large enough to force the record to span multiple 64KB chunks
    const largeValue = 'a'.repeat(200000);
    const row = JSON.stringify({ key: 'bigkey', val: largeValue }) + '\n';
    fs.writeFileSync(file, row, 'utf-8');

    const errors: Error[] = [];
    const db = new Dirty(file);

    db.on('error', (err: Error) => {
      errors.push(err);
    });

    db.on('load', (length: number) => {
      try {
        expect(errors).toHaveLength(0);
        expect(length).toBe(1);
        expect(db.get('bigkey')).toBe(largeValue);
        fs.unlinkSync(file);
        done();
      } catch (e) {
        try { fs.unlinkSync(file); } catch (_) {}
        done(e);
      }
    });
  });
});