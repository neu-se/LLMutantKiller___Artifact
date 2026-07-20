import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty', () => {
  it('should emit error when file has no trailing newline (corrupted end)', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `test-dirty-notrail-${process.pid}.dirty`);
    
    // File with no trailing newline - last row is "corrupted" from dirty's perspective
    const content = `{"key":"a","val":"1"}\n{"key":"b","val":"2"}`;
    fs.writeFileSync(file, content, 'utf-8');

    const errors: Error[] = [];
    const db = new Dirty(file);
    
    db.on('error', (err: Error) => {
      errors.push(err);
    });
    
    db.on('load', (length: number) => {
      try {
        // Both original and mutated should emit error for corrupted end
        // and load only the first complete record
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].message).toContain('Corrupted row');
        fs.unlinkSync(file);
        done();
      } catch (e) {
        try { fs.unlinkSync(file); } catch (_) {}
        done(e);
      }
    });
  });
});