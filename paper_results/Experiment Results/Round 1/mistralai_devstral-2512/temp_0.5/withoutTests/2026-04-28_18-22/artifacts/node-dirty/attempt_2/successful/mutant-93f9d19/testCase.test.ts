import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty database error event emission', () => {
  it('should emit error event with correct event name when corrupted row at end of file', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');

    // Create a database file with a complete row followed by incomplete data
    fs.writeFileSync(dbPath, '{"key":"test","val":123}\n{"key":"incomplete"');

    const dirty = new Dirty(dbPath);
    let errorEmitted = false;

    // Listen for error event
    dirty.on('error', (err) => {
      errorEmitted = true;
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toContain('Corrupted row at the end of the db');
      done();
    });

    // Clean up after test
    dirty.on('load', () => {
      try {
        fs.unlinkSync(dbPath);
        fs.rmdirSync(testDir);
      } catch (e) {
        // Ignore cleanup errors
      }
    });

    // Fail test if no error was emitted after timeout
    setTimeout(() => {
      if (!errorEmitted) {
        done(new Error('Expected error event was not emitted'));
      }
    }, 1000);
  });
});