import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty database', () => {
  it('should correctly handle a db file where a row has no key property', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    // A row that is valid JSON but missing the "key" property triggers the error path
    // After the catch+return, the code must NOT try to process row.val (row is undefined)
    // This verifies the return actually exits the forEach callback
    const dbContent = '{"key":"a","val":1}\n{"nokey":"bad"}\n{"key":"b","val":2}\n';
    fs.writeFileSync(dbPath, dbContent, 'utf-8');

    const db = new Dirty(dbPath);
    const errors: Error[] = [];

    db.on('error', (err: Error) => {
      errors.push(err);
    });

    db.on('load', (count: number) => {
      try {
        // Only 2 valid rows should be loaded
        expect(count).toBe(2);
        expect(db.get('a')).toBe(1);
        expect(db.get('b')).toBe(2);
        // The bad row should have triggered exactly one error
        expect(errors.length).toBe(1);
        expect(errors[0].message).toContain('nokey');

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