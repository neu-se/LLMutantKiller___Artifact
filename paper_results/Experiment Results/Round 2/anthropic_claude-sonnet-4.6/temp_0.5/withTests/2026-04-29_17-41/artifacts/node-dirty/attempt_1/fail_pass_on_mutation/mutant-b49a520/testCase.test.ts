import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty db file loading', () => {
  it('should correctly load data from a file where chunks may not contain newlines', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-mutant-test-${Date.now()}.dirty`);

    // Write a db file with multiple records
    const row1 = JSON.stringify({ key: 'hello', val: 'world' }) + '\n';
    const row2 = JSON.stringify({ key: 'foo', val: 'bar' }) + '\n';
    const row3 = JSON.stringify({ key: 'baz', val: 42 }) + '\n';
    fs.writeFileSync(file, row1 + row2 + row3, 'utf-8');

    const db = new (Dirty as any)(file);

    db.on('load', (length: number) => {
      try {
        expect(length).toBe(3);
        expect(db.get('hello')).toBe('world');
        expect(db.get('foo')).toBe('bar');
        expect(db.get('baz')).toBe(42);
        fs.unlinkSync(file);
        done();
      } catch (err) {
        fs.unlinkSync(file);
        done(err);
      }
    });

    db.on('error', (err: Error) => {
      try {
        fs.unlinkSync(file);
      } catch (_) {}
      done(err);
    });
  });
});