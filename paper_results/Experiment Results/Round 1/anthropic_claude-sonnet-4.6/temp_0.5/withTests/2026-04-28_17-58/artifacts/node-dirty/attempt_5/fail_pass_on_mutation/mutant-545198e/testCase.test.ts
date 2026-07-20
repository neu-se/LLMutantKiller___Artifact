import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty', () => {
  it('should load records from an existing database file into memory', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `test-dirty-load-${process.pid}.dirty`);

    const content = `{"key":"hello","val":"world"}\n{"key":"foo","val":"bar"}\n`;
    fs.writeFileSync(file, content, 'utf-8');

    const db = new Dirty(file);

    db.on('error', (err: Error) => {
      try { fs.unlinkSync(file); } catch (_) {}
      done(err);
    });

    db.on('load', (length: number) => {
      try {
        expect(length).toBe(2);
        expect(db.get('hello')).toBe('world');
        expect(db.get('foo')).toBe('bar');
        fs.unlinkSync(file);
        done();
      } catch (e) {
        try { fs.unlinkSync(file); } catch (_) {}
        done(e);
      }
    });
  });
});