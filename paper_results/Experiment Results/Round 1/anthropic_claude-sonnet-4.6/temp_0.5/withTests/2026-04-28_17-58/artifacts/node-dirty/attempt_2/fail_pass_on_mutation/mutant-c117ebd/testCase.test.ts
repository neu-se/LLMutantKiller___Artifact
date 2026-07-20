import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('dirty read stream encoding', () => {
  it('should emit load event without errors when reading an existing file', (done) => {
    const tmpDir = os.tmpdir();
    const filePath = path.join(tmpDir, `dirty-encoding-test-${process.pid}.dirty`);
    const row = JSON.stringify({ key: 'testkey', val: 'testvalue' }) + '\n';
    fs.writeFileSync(filePath, row, 'utf-8');

    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(filePath);
    let errorOccurred = false;

    db.on('error', () => {
      errorOccurred = true;
    });

    db.on('load', (length: number) => {
      try {
        expect(errorOccurred).toBe(false);
        expect(length).toBe(1);
        expect(db.get('testkey')).toBe('testvalue');
        fs.unlinkSync(filePath);
        done();
      } catch (err) {
        try { fs.unlinkSync(filePath); } catch (_) {}
        done(err);
      }
    });
  });
});