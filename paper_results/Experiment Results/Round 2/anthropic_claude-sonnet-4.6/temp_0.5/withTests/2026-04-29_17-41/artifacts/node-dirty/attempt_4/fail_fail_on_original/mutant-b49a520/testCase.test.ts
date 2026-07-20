import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('dirty db loading behavior with no-newline content', () => {
  it('should emit load event with 0 records when file content has no newline', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-mutant-test-${process.pid}.dirty`);

    // Write file content WITHOUT a trailing newline - simulates a "corrupted" partial write
    // The entire file is one chunk with no '\n'
    fs.writeFileSync(file, '{"key":"foo","val":"bar"}', 'utf-8');

    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(file);

    db.on('load', (length: number) => {
      try { fs.unlinkSync(file); } catch (_) {}
      expect(length).toBe(0);
      done();
    });

    db.on('error', (err: Error) => {
      try { fs.unlinkSync(file); } catch (_) {}
      done(new Error(`Expected load event but got error: ${err.message}`));
    });
  });
});