import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty read stream close event', () => {
  it('should emit read_close event when read stream is closed', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const db = new Dirty(dbPath);

    db.on('load', () => {
      db._readStream?.destroy();
    });

    db.on('read_close', () => {
      try {
        expect(db._readStream).toBeNull();
        done();
      } catch (error) {
        done(error);
      } finally {
        fs.unlinkSync(dbPath);
        fs.rmdirSync(testDir);
      }
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});