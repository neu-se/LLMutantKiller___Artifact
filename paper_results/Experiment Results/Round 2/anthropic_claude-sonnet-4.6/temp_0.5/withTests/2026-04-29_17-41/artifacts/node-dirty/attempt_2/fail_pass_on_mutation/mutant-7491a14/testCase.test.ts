import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty db encoding on load', () => {
  it('should correctly parse records from disk using utf-8 encoding', (done) => {
    const file = path.join(os.tmpdir(), `dirty-encoding-test-${process.pid}.dirty`);

    // Pre-write a valid dirty db file manually with utf-8 content
    const row1 = JSON.stringify({ key: 'name', val: 'alice' }) + '\n';
    const row2 = JSON.stringify({ key: 'city', val: 'paris' }) + '\n';
    fs.writeFileSync(file, row1 + row2, 'utf-8');

    const db = new Dirty(file);

    db.on('load', (length: number) => {
      try {
        expect(length).toBe(2);
        expect(db.get('name')).toBe('alice');
        expect(db.get('city')).toBe('paris');
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