import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty _flush backpressure', () => {
  it('should write the same key only once when set is called twice during backpressure', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    const db = new Dirty(dbPath);

    db.on('load', () => {
      const largePayload = 'x'.repeat(65536);
      let callbackCount = 0;

      const checkDone = () => {
        callbackCount++;
        if (callbackCount === 3) { // cb1, cb2a, cb2b
          setTimeout(() => {
            db.close();
            db.on('write_close', () => {
              const content = fs.readFileSync(dbPath, 'utf-8');
              const lines = content.trim().split('\n').filter(l => l.length > 0);
              fs.rmSync(tmpDir, { recursive: true, force: true });
              // key1 written once, key2 written once (with latest value)
              expect(lines.length).toBe(2);
              done();
            });
          }, 200);
        }
      };

      db.set('key1', largePayload, checkDone);
      db.set('key2', 'val1', checkDone); // cb2a
      db.set('key2', 'val2', checkDone); // cb2b
    });

    db.on('error', (err: unknown) => {
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done(err as Error);
    });
  }, 10000);
});