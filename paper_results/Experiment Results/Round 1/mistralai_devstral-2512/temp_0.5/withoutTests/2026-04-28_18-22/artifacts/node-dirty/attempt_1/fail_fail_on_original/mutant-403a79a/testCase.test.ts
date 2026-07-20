import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty database empty line handling', () => {
  it('should emit an error with descriptive message when encountering an empty line', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const emptyLine = '\n';

    // Create a database file with an empty line
    fs.writeFileSync(dbPath, emptyLine, 'utf-8');

    const db = new Dirty(dbPath);

    db.on('error', (error) => {
      try {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Empty lines never appear in a healthy database');
        done();
      } catch (e) {
        done(e);
      } finally {
        // Cleanup
        fs.unlinkSync(dbPath);
        fs.rmdirSync(testDir);
      }
    });

    // Trigger the load process
    db.on('load', () => {
      // This should not be reached if error is emitted
      done(new Error('Expected error event was not emitted'));
    });
  });
});