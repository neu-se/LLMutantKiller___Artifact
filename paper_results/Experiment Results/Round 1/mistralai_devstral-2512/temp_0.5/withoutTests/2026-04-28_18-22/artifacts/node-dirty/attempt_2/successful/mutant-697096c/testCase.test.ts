import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty database empty line handling', () => {
  it('should handle empty lines in database file correctly', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const contentWithEmptyLine = '{"key":"test","val":"value"}\n\n{"key":"test2","val":"value2"}\n';

    fs.writeFileSync(dbPath, contentWithEmptyLine);

    const db = new Dirty(dbPath);

    db.on('error', (err) => {
      expect(err.message).toBe('Empty lines never appear in a healthy database');
      db.close();
      cleanup();
      done();
    });

    db.on('load', () => {
      db.close();
      cleanup();
      done(new Error('Expected error for empty line but got load event'));
    });

    function cleanup() {
      try {
        fs.unlinkSync(dbPath);
        fs.rmdirSync(testDir);
      } catch (e) {
        // Ignore cleanup errors
      }
    }
  });
});