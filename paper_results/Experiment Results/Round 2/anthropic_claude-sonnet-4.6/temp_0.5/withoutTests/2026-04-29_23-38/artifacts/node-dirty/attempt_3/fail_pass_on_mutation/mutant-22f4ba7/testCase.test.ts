import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty close() defers when writes are in flight', () => {
  it('should invoke the set callback successfully even when close() is called immediately after set()', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    db.on('load', () => {
      let callbackError: Error | null | undefined = undefined;
      let callbackCalled = false;

      // Set a value with a callback - the callback should be called with no error
      db.set('key1', { value: 'important data' }, (err?: Error | null) => {
        callbackCalled = true;
        callbackError = err;
      });

      // Immediately close - original code defers close until after drain
      // mutated code destroys the stream immediately, causing write to fail
      db.close();

      // After a reasonable time, check that the callback was called without error
      setTimeout(() => {
        expect(callbackCalled).toBe(true);
        expect(callbackError).toBeFalsy();

        // Also verify data was actually written to disk
        const fileContent = fs.readFileSync(dbPath, 'utf-8');
        const lines = fileContent.trim().split('\n').filter(l => l.length > 0);
        expect(lines.length).toBeGreaterThanOrEqual(1);
        const row = JSON.parse(lines[lines.length - 1]);
        expect(row.key).toBe('key1');
        expect(row.val).toEqual({ value: 'important data' });

        fs.rmSync(tmpDir, { recursive: true });
        done();
      }, 500);
    });
  });
});