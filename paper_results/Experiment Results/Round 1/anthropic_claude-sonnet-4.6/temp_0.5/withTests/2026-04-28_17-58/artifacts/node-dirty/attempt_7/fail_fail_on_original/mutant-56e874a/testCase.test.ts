import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('_flush guard behavior', () => {
  it('should complete all write callbacks before emitting drain', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const file = path.join(tmpDir, 'test.dirty');
    const db = new Dirty(file);

    db.on('load', () => {
      let callbacksFired = 0;
      const total = 3;

      const cb = () => { callbacksFired++; };

      db.set('a', '1', cb);
      db.set('b', '2', cb);
      db.set('c', '3', cb);

      db.once('drain', () => {
        expect(callbacksFired).toBe(total);
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done();
      });
    });
  });
});