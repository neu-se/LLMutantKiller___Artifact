import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty flush backpressure handling', () => {
  it('should fire all write callbacks and emit drain when writing multiple keys rapidly', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    const db = new Dirty(dbPath);

    const cleanup = (err?: Error) => {
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}
      done(err);
    };

    db.on('load', () => {
      const numKeys = 50;
      let callbackCount = 0;

      for (let i = 0; i < numKeys; i++) {
        db.set(`key${i}`, `value${i}`, (err?: Error) => {
          if (err) return cleanup(err);
          callbackCount++;
          if (callbackCount === numKeys) {
            try {
              expect(callbackCount).toBe(numKeys);
              for (let j = 0; j < numKeys; j++) {
                expect(db.get(`key${j}`)).toBe(`value${j}`);
              }
              cleanup();
            } catch (e) {
              cleanup(e as Error);
            }
          }
        });
      }
    });

    db.on('error', (err: Error) => cleanup(err));
  }, 10000);
});