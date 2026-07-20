import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty db loading from file with multiple records', () => {
  it('should correctly load all records from a file with multiple rows including deletions', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-mutant-test-${Date.now()}.dirty`);

    // Write a db file with multiple records
    const rows = [
      JSON.stringify({ key: 'a', val: 1 }),
      JSON.stringify({ key: 'b', val: 2 }),
      JSON.stringify({ key: 'c', val: 3 }),
      JSON.stringify({ key: 'b', val: null }),
      JSON.stringify({ key: 'd', val: 4 }),
    ].join('\n') + '\n';

    fs.writeFileSync(file, rows, 'utf-8');

    const db = new Dirty(file);
    db.on('load', (size: number) => {
      try {
        expect(db.get('a')).toBe(1);
        expect(db.get('b')).toBeNull();
        expect(db.get('c')).toBe(3);
        expect(db.get('d')).toBe(4);
        expect(size).toBe(4);

        fs.unlinkSync(file);
        done();
      } catch (err) {
        fs.unlinkSync(file);
        done(err);
      }
    });

    db.on('error', (err: Error) => {
      try { fs.unlinkSync(file); } catch (_) {}
      done(err);
    });
  });
});