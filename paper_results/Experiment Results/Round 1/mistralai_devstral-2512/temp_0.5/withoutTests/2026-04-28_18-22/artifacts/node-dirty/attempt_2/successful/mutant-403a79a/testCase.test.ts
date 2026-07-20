import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty database empty line handling', () => {
  it('should emit an error when encountering an empty line', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const emptyLine = '\n';

    // Create a database file with an empty line
    fs.writeFileSync(dbPath, emptyLine, 'utf-8');

    const db = new Dirty(dbPath);
    let errorEmitted = false;

    db.on('error', (error) => {
      errorEmitted = true;
      expect(error).toBeInstanceOf(Error);
      expect(error.message).not.toBe('');
      done();
    });

    db.on('load', () => {
      if (!errorEmitted) {
        done(new Error('Expected error event was not emitted for empty line'));
      }
    });

    // Cleanup after test
    setTimeout(() => {
      try {
        fs.unlinkSync(dbPath);
        fs.rmdirSync(testDir);
      } catch (e) {
        // Ignore cleanup errors
      }
    }, 100);
  });
});