import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { rimraf } from 'rimraf';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty - row validation on load', () => {
  it('should emit an error when loading a row without a key field', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    // Write a db file with a row that has no 'key' field
    fs.writeFileSync(dbPath, JSON.stringify({ val: 'some value' }) + '\n', 'utf-8');

    const db = new Dirty(dbPath);

    let errorEmitted = false;

    db.on('error', (err: Error) => {
      errorEmitted = true;
    });

    db.on('load', () => {
      try {
        expect(errorEmitted).toBe(true);
        db.close();
        db.on('write_close', () => {
          rimraf(tmpDir).then(() => done()).catch(done);
        });
      } catch (e) {
        rimraf(tmpDir).then(() => done(e)).catch(done);
      }
    });
  });
});