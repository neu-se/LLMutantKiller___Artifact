import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty database key validation', () => {
  it('should emit error when loading corrupted row without key', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const corruptedData = '{"val":"some value"}\n';

    fs.writeFileSync(dbPath, corruptedData);

    const db = new Dirty(dbPath);

    db.on('error', (err) => {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toContain('Could not load corrupted row');
      db.close();
      fs.unlinkSync(dbPath);
      fs.rmdirSync(testDir);
      done();
    });

    db.on('load', () => {
      db.close();
      fs.unlinkSync(dbPath);
      fs.rmdirSync(testDir);
      done(new Error('Expected error event but got load event'));
    });
  });
});