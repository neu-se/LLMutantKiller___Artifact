import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('dirty flush behavior', () => {
  it('should have all keys written to disk when drain fires after setting multiple keys', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-mutant-test-${process.pid}-${Date.now()}.dirty`);
    const db = new (Dirty as any)(tmpFile);

    db.on('load', () => {
      db.set('alpha', 'value1');
      db.set('beta', 'value2');
      db.set('gamma', 'value3');

      db.on('drain', () => {
        const contents = fs.readFileSync(tmpFile, 'utf-8');
        expect(contents).toContain('"alpha"');
        expect(contents).toContain('"beta"');
        expect(contents).toContain('"gamma"');
        try { fs.unlinkSync(tmpFile); } catch {}
        done();
      });
    });
  }, 5000);
});