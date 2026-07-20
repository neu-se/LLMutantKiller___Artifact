import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('dirty _flush with empty queue should not crash', () => {
  it('should write all keys exactly once to disk and fire drain after all callbacks complete', (done) => {
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const file = path.join(os.tmpdir(), `dirty-mutant-${process.pid}.dirty`);

    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);
    const numKeys = 200;
    let callbacksFired = 0;

    db.on('load', () => {
      for (let i = 0; i < numKeys; i++) {
        db.set(`key${i}`, `value${i}`, (err: Error | null) => {
          expect(err).toBeNull();
          callbacksFired++;
        });
      }

      db.on('drain', () => {
        expect(callbacksFired).toBe(numKeys);
        const contents = fs.readFileSync(file, 'utf-8');
        const lines = contents.trim().split('\n').filter(Boolean);
        // Each key should appear exactly once
        expect(lines.length).toBe(numKeys);
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        done();
      });
    });
  });
});