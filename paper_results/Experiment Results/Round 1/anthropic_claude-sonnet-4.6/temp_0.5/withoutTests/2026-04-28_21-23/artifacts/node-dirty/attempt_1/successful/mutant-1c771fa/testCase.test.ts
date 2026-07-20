import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty - corrupted row error handling', () => {
  it('should emit an error event when a corrupted row is encountered during load', (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-test-corrupted-${Date.now()}.db`);

    // Write a database file with a corrupted row (invalid JSON)
    const corruptedContent = 'this is not valid json\n';
    fs.writeFileSync(dbPath, corruptedContent, 'utf-8');

    const db = new Dirty(dbPath);

    let errorEmitted = false;
    let errorMessage = '';

    db.on('error', (err: Error) => {
      errorEmitted = true;
      errorMessage = err.message;
    });

    db.on('load', () => {
      // Clean up
      try {
        fs.unlinkSync(dbPath);
      } catch (e) {
        // ignore cleanup errors
      }

      expect(errorEmitted).toBe(true);
      expect(errorMessage).toContain('Could not load corrupted row');
      expect(errorMessage).toContain('this is not valid json');
      done();
    });
  });
});