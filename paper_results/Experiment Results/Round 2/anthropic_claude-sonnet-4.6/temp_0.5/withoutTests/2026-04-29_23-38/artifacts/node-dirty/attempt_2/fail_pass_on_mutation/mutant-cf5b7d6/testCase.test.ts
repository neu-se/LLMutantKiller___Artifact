import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty database loading', () => {
  it('should correctly load multiple rows from an existing database file', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const rows = [
      JSON.stringify({ key: 'foo', val: 'bar' }),
      JSON.stringify({ key: 'baz', val: 42 }),
      JSON.stringify({ key: 'obj', val: { nested: true } }),
    ].join('\n') + '\n';

    fs.writeFileSync(dbPath, rows, 'utf-8');

    const db = new Dirty(dbPath);

    db.on('load', (count: number) => {
      try {
        expect(count).toBe(3);
        expect(db.get('foo')).toBe('bar');
        expect(db.get('baz')).toBe(42);
        expect(db.get('obj')).toEqual({ nested: true });
        expect(db.size()).toBe(3);
        db.close();
        db.once('write_close', () => {
          try {
            fs.rmSync(tmpDir, { recursive: true, force: true });
          } catch (_) {}
          done();
        });
      } catch (err) {
        try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}
        done(err);
      }
    });

    db.on('error', (err: Error) => {
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}
      done(err);
    });
  });
});