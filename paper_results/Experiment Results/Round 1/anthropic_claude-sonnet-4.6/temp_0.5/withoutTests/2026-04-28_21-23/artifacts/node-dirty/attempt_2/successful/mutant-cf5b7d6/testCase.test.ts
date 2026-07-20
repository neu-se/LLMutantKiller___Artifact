import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty database loading callback return value', () => {
  it('should return empty string from the forEach row processing callback', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const rows = JSON.stringify({ key: 'foo', val: 'bar' }) + '\n';
    fs.writeFileSync(dbPath, rows, 'utf-8');

    const returnValues: unknown[] = [];
    const originalForEach = Array.prototype.forEach;
    Array.prototype.forEach = function<T>(this: T[], callback: (value: T, index: number, array: T[]) => void, thisArg?: unknown) {
      const wrappedCallback = (value: T, index: number, array: T[]) => {
        const result = (callback as (value: T, index: number, array: T[]) => unknown).call(thisArg, value, index, array);
        returnValues.push(result);
        return result;
      };
      return originalForEach.call(this, wrappedCallback as (value: T, index: number, array: T[]) => void, thisArg);
    } as typeof Array.prototype.forEach;

    const db = new Dirty(dbPath);

    db.on('load', () => {
      Array.prototype.forEach = originalForEach;
      try {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        // The forEach callback in the data processing should return ''
        expect(returnValues).toContain('');
        expect(returnValues).not.toContain('Stryker was here!');
        done();
      } catch (e) {
        done(e);
      }
    });

    db.on('error', (err: Error) => {
      Array.prototype.forEach = originalForEach;
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done(err);
    });
  });
});