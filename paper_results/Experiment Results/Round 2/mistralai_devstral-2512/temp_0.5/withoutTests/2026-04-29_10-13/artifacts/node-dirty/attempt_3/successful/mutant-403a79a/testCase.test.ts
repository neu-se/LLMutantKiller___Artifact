import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty database empty line handling', () => {
  it('should emit an error with specific message when encountering empty lines', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const emptyLineDbContent = '{"key":"test","val":"value"}\n\n{"key":"test2","val":"value2"}\n';

    fs.writeFileSync(dbPath, emptyLineDbContent);

    const db = new Dirty(dbPath);
    let errorEmitted = false;

    db.on('error', (err) => {
      errorEmitted = true;
      try {
        expect(err.message).toBe('Empty lines never appear in a healthy database');
        done();
      } catch (e) {
        done(e);
      }
    });

    db.on('load', () => {
      if (!errorEmitted) {
        done(new Error('Expected error event was not emitted'));
      }
    });

    // Cleanup after test completes
    setTimeout(() => {
      try {
        fs.unlinkSync(dbPath);
        fs.rmdirSync(testDir);
      } catch (cleanupErr) {
        // Ignore cleanup errors
      }
    }, 100);
  });
});