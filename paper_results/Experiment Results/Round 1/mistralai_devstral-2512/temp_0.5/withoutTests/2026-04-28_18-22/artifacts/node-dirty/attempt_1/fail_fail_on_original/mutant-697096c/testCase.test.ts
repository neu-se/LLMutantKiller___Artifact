import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty database empty line handling', () => {
  it('should emit an error when encountering an empty line in the database file', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const emptyLineContent = '{"key":"test","val":"value"}\n\n{"key":"test2","val":"value2"}\n';

    fs.writeFileSync(dbPath, emptyLineContent);

    const db = new Dirty(dbPath);

    db.on('error', (err) => {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe('Empty lines never appear in a healthy database');
      fs.unlinkSync(dbPath);
      fs.rmdirSync(testDir);
      done();
    });

    db.on('load', () => {
      fs.unlinkSync(dbPath);
      fs.rmdirSync(testDir);
      done(new Error('Expected error event for empty line, but got load event instead'));
    });
  });
});