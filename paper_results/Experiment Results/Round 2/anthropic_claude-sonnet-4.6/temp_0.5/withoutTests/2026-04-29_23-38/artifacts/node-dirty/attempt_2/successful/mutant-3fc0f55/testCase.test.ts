import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event handling', () => {
  it('should flush all queued writes after write stream drain event fires', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    const cleanup = (err?: Error) => {
      try {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      } catch (_) {}
      if (err) done(err);
      else done();
    };

    db.on('load', () => {
      // Write a large number of large values to overflow the write stream buffer
      // This should cause write() to return false, setting _waitForDrain = true
      const totalKeys = 200;
      let completedCallbacks = 0;
      const errors: Error[] = [];

      const checkDone = (err?: Error) => {
        if (err) errors.push(err);
        completedCallbacks++;
        if (completedCallbacks === totalKeys) {
          db.close();
        }
      };

      // Write large values to force buffer overflow
      const largeValue = 'x'.repeat(64 * 1024); // 64KB per value
      for (let i = 0; i < totalKeys; i++) {
        db.set(`key${i}`, { data: largeValue, index: i }, checkDone);
      }

      db.on('write_close', () => {
        try {
          // Verify all writes completed
          expect(errors).toHaveLength(0);
          expect(completedCallbacks).toBe(totalKeys);

          // Verify data was actually persisted to disk
          const fileContent = fs.readFileSync(dbPath, 'utf-8');
          const lines = fileContent.trim().split('\n').filter(l => l.length > 0);
          expect(lines.length).toBe(totalKeys);

          // Verify all keys are present
          const parsedKeys = new Set(lines.map(line => JSON.parse(line).key));
          for (let i = 0; i < totalKeys; i++) {
            expect(parsedKeys.has(`key${i}`)).toBe(true);
          }

          cleanup();
        } catch (e) {
          cleanup(e as Error);
        }
      });
    });

    db.on('error', (err: Error) => {
      cleanup(err);
    });
  }, 30000);
});