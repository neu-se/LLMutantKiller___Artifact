import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { rimraf } from 'rimraf';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty database loading', () => {
  it('should correctly load data from an existing database file and emit the correct load count', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    // Write a valid dirty db file with multiple rows
    const rows = [
      JSON.stringify({ key: 'foo', val: 'bar' }),
      JSON.stringify({ key: 'baz', val: 42 }),
      JSON.stringify({ key: 'qux', val: { nested: true } }),
    ].join('\n') + '\n';

    fs.writeFileSync(dbPath, rows, 'utf-8');

    const db = new Dirty(dbPath);

    db.on('load', (count: number) => {
      try {
        expect(count).toBe(3);
        expect(db.get('foo')).toBe('bar');
        expect(db.get('baz')).toBe(42);
        expect(db.get('qux')).toEqual({ nested: true });
        expect(db.size()).toBe(3);
        db.close();
        db.once('write_close', () => {
          rimraf(tmpDir).then(() => done()).catch(done);
        });
      } catch (e) {
        rimraf(tmpDir).then(() => done(e)).catch(done);
      }
    });

    db.on('error', (err: Error) => {
      rimraf(tmpDir).then(() => done(err)).catch(done);
    });
  });
});