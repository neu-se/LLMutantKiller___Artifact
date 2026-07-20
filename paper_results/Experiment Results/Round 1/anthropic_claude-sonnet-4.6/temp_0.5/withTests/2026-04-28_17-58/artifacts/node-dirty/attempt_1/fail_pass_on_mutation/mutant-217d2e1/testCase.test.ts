import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty corrupted row handling', () => {
  it('should emit error for corrupted row and continue processing valid rows', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-test-${Date.now()}-${Math.floor(Math.random() * 1000000)}.dirty`);

    // Write a db file with a corrupted row followed by a valid row
    const content = 'CORRUPTED_ROW\n{"key":"validKey","val":"validValue"}\n';
    fs.writeFileSync(file, content, 'utf-8');

    const db = new (Dirty as any)(file);
    let errorEmitted = false;

    db.on('error', (err: Error) => {
      errorEmitted = true;
    });

    db.on('load', (length: number) => {
      try {
        // The valid row after the corrupted one should still be loaded
        expect(errorEmitted).toBe(true);
        expect(db.get('validKey')).toBe('validValue');
        expect(length).toBe(1);
        fs.unlinkSync(file);
        done();
      } catch (e) {
        fs.unlinkSync(file);
        done(e);
      }
    });
  });
});