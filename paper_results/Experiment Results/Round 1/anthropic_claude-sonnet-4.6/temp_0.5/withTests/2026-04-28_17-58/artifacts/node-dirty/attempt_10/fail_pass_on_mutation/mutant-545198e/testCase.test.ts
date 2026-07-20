import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty', () => {
  it('should have correct data accessible via forEach after loading from file', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `test-dirty-foreach-${process.pid}.dirty`);

    const rows = [
      JSON.stringify({key: 'name', val: 'alice'}),
      JSON.stringify({key: 'age', val: 30}),
    ].join('\n') + '\n';
    
    fs.writeFileSync(file, rows, 'utf-8');

    const db = new Dirty(file);

    db.on('error', (err: Error) => {
      try { fs.unlinkSync(file); } catch (_) {}
      done(err);
    });

    db.on('load', () => {
      try {
        const collected: Array<[string, unknown]> = [];
        db.forEach((key: string, val: unknown) => {
          collected.push([key, val]);
        });
        expect(collected).toEqual([['name', 'alice'], ['age', 30]]);
        fs.unlinkSync(file);
        done();
      } catch (e) {
        try { fs.unlinkSync(file); } catch (_) {}
        done(e);
      }
    });
  });
});