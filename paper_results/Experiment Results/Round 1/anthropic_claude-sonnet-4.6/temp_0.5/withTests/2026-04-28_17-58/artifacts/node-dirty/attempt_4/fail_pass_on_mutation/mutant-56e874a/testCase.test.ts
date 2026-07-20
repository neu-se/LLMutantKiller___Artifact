import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('_flush cork behavior', () => {
  it('should write all keys set before drain to disk correctly', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const file = path.join(tmpDir, 'test.dirty');
    const db = new Dirty(file);

    db.on('load', () => {
      let callbackCount = 0;
      const total = 5;

      const checkDone = (err: Error | null) => {
        expect(err).toBeNull();
        callbackCount++;
        if (callbackCount === total) {
          // Verify all keys persisted correctly
          const contents = fs.readFileSync(file, 'utf-8');
          const lines = contents.trim().split('\n');
          expect(lines.length).toBe(total);
          fs.rmSync(tmpDir, { recursive: true, force: true });
          done();
        }
      };

      for (let i = 0; i < total; i++) {
        db.set(`key${i}`, `val${i}`, checkDone);
      }
    });
  });
});