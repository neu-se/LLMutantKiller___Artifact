import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty db encoding on load', () => {
  it('should correctly load records containing non-ASCII unicode characters from disk', (done) => {
    const file = path.join(os.tmpdir(), `dirty-unicode-test-${process.pid}.dirty`);

    // Write a record with multi-byte UTF-8 characters (emoji/CJK)
    // These characters have different byte lengths vs char lengths
    const value = '日本語テスト🎉';
    const row = JSON.stringify({ key: 'unicode', val: value }) + '\n';
    fs.writeFileSync(file, row, 'utf-8');

    const db = new Dirty(file);

    db.on('load', (length: number) => {
      try {
        expect(length).toBe(1);
        expect(db.get('unicode')).toBe(value);
        fs.unlinkSync(file);
        done();
      } catch (err) {
        try { fs.unlinkSync(file); } catch (_) { /* ignore */ }
        done(err);
      }
    });

    db.on('error', (err: Error) => {
      try { fs.unlinkSync(file); } catch (_) { /* ignore */ }
      done(err);
    });
  });
});