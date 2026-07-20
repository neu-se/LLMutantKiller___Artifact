import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty - row validation on load', () => {
  it('should emit an error when loading a row without a key field', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    // Write a db file with a row that has no 'key' field
    fs.writeFileSync(dbPath, JSON.stringify({ val: 'some value' }) + '\n', 'utf-8');

    const db = new Dirty(dbPath);

    let errorEmitted = false;

    db.on('error', () => {
      errorEmitted = true;
    });

    db.on('load', () => {
      const passed = errorEmitted;
      // Clean up
      try {
        if (db._writeStream) {
          db._writeStream.end(() => {
            db._writeStream.destroy();
            fs.rmSync(tmpDir, { recursive: true, force: true });
            if (passed) {
              done();
            } else {
              done(new Error('Expected error event to be emitted for row without key field'));
            }
          });
        } else {
          fs.rmSync(tmpDir, { recursive: true, force: true });
          if (passed) {
            done();
          } else {
            done(new Error('Expected error event to be emitted for row without key field'));
          }
        }
      } catch (e) {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done(e);
      }
    });
  });
});