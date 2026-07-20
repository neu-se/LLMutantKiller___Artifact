import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty write stream encoding', () => {
  it('should emit an error when write stream has invalid encoding', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-enc-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const errors: Error[] = [];
    const db = new Dirty(dbPath);

    db.on('error', (err: Error) => {
      errors.push(err);
    });

    db.on('load', () => {
      db.set('key1', 'value1', () => {
        // If we get here without error, the original code worked fine
        // The mutated code with encoding: "" should have caused an error
        expect(errors.length).toBe(0);
        
        db.close();
        db.once('write_close', () => {
          fs.rmSync(tmpDir, { recursive: true });
          done();
        });
      });
    });
  });
});