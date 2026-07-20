import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('dirty db forEach callback return value', () => {
  it('should return empty string from the forEach callback during data loading', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-retval-test-${process.pid}.dirty`);

    const rows = [
      JSON.stringify({ key: 'a', val: 1 }),
      JSON.stringify({ key: 'b', val: 2 }),
    ].join('\n') + '\n';

    fs.writeFileSync(file, rows, 'utf-8');

    const returnValues: unknown[] = [];
    const originalForEach = Array.prototype.forEach;
    Array.prototype.forEach = function<T>(
      this: T[],
      callback: (value: T, index: number, array: T[]) => void,
      thisArg?: unknown
    ): void {
      originalForEach.call(this, (value: T, index: number, array: T[]) => {
        const ret = (callback as (value: T, index: number, array: T[]) => unknown).call(thisArg, value, index, array);
        returnValues.push(ret);
      });
    } as typeof Array.prototype.forEach;

    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(file);

    db.on('load', () => {
      Array.prototype.forEach = originalForEach;
      try {
        expect(returnValues.length).toBeGreaterThan(0);
        // Every return value from the forEach callback should be '' (empty string)
        for (const val of returnValues) {
          expect(val).toBe('');
        }
        fs.unlinkSync(file);
        done();
      } catch (err) {
        try { fs.unlinkSync(file); } catch (_) {}
        done(err);
      }
    });

    db.on('error', (err: Error) => {
      Array.prototype.forEach = originalForEach;
      try { fs.unlinkSync(file); } catch (_) {}
      done(err);
    });
  });
});