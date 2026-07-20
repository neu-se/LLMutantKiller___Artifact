import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty database loading with corrupted rows', () => {
  it('should emit error for corrupted row and not process it as valid data', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    // Write a database file with a corrupted row between valid rows
    const dbContent = '{"key":"valid1","val":"value1"}\ncorrupted_row\n{"key":"valid2","val":"value2"}\n';
    fs.writeFileSync(dbPath, dbContent, 'utf-8');

    const db = new Dirty(dbPath);
    const errors: Error[] = [];

    db.on('error', (err: Error) => {
      errors.push(err);
    });

    db.on('load', (count: number) => {
      try {
        expect(count).toBe(2);
        expect(db.get('valid1')).toBe('value1');
        expect(db.get('valid2')).toBe('value2');
        expect(errors.length).toBe(1);

        db.close();
        db.once('write_close', () => {
          fs.rmSync(tmpDir, { recursive: true, force: true });
          done();
        });
      } catch (e) {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done(e);
      }
    });
  });
});