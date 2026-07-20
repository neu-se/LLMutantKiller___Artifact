import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty file loading with newline handling', () => {
  it('should correctly load all records from a file written with multiple entries', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-mutant-test-${Date.now()}.dirty`);

    // Write a dirty file manually with multiple rows
    const rows = [
      JSON.stringify({ key: 'alpha', val: 'one' }),
      JSON.stringify({ key: 'beta', val: 'two' }),
      JSON.stringify({ key: 'gamma', val: 'three' }),
      JSON.stringify({ key: 'delta', val: 'four' }),
      JSON.stringify({ key: 'epsilon', val: 'five' }),
    ];
    const content = rows.join('\n') + '\n';
    fs.writeFileSync(file, content, 'utf-8');

    // Now load it with Dirty
    const db = new (Dirty as any)(file);

    db.on('load', (length: number) => {
      try {
        // All 5 records should be loaded
        expect(length).toBe(5);
        expect(db.get('alpha')).toBe('one');
        expect(db.get('beta')).toBe('two');
        expect(db.get('gamma')).toBe('three');
        expect(db.get('delta')).toBe('four');
        expect(db.get('epsilon')).toBe('five');

        // Clean up
        try { fs.unlinkSync(file); } catch (_) {}
        done();
      } catch (err) {
        try { fs.unlinkSync(file); } catch (_) {}
        done(err);
      }
    });

    db.on('error', (err: Error) => {
      try { fs.unlinkSync(file); } catch (_) {}
      done(err);
    });
  });
});