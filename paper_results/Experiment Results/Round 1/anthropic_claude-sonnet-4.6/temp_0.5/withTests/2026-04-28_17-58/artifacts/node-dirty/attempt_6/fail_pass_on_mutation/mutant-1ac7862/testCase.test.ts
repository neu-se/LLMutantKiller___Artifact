import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('dirty flush behavior', () => {
  it('should write all keys to disk before write_close fires', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-mutant-test-${process.pid}-${Date.now()}.dirty`);
    const db = new (Dirty as any)(tmpFile);

    db.on('load', () => {
      db.set('alpha', 'value1');
      db.set('beta', 'value2');
      db.set('gamma', 'value3');

      // close() waits for drain before closing
      db.close();

      db.on('write_close', () => {
        const contents = fs.readFileSync(tmpFile, 'utf-8');
        const lines = contents.trim().split('\n').filter(Boolean);
        // All 3 keys must be written
        expect(lines.length).toBe(3);
        try { fs.unlinkSync(tmpFile); } catch {}
        done();
      });
    });
  }, 5000);
});