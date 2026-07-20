import { EventEmitter } from 'events';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('Dirty corrupted row error handling', () => {
  it('should emit an error event when a corrupted row is encountered during load', (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-test-corrupted-${Date.now()}.db`);

    // Write a file with a corrupted row (invalid JSON)
    const validRow = JSON.stringify({ key: 'validKey', val: 'validValue' }) + '\n';
    const corruptedRow = 'this is not valid json\n';
    fs.writeFileSync(dbPath, validRow + corruptedRow, 'utf-8');

    const db = new Dirty(dbPath);
    let errorEmitted = false;
    let errorMessage = '';

    db.on('error', (err: Error) => {
      errorEmitted = true;
      errorMessage = err.message;
    });

    db.on('load', () => {
      try {
        expect(errorEmitted).toBe(true);
        expect(errorMessage).toContain('Could not load corrupted row');
        done();
      } catch (e) {
        done(e);
      } finally {
        try {
          db.close();
          fs.unlinkSync(dbPath);
        } catch (_) {}
      }
    });
  });
});