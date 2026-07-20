import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty database loading', () => {
  it('should return empty string from forEach callback during data loading', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const rows = [
      JSON.stringify({ key: 'foo', val: 'bar' }),
      JSON.stringify({ key: 'baz', val: 42 }),
    ].join('\n') + '\n';

    fs.writeFileSync(dbPath, rows, 'utf-8');

    const returnValues: unknown[] = [];
    const originalForEach = Array.prototype.forEach;

    // Temporarily override forEach to capture return values from callbacks
    (Array.prototype as any).forEach = function(this: unknown[], callback: (...args: any[]) => any, thisArg?: any) {
      return originalForEach.call(this, (...args: any[]) => {
        const ret = callback.apply(thisArg, args);
        returnValues.push(ret);
        return ret;
      }, thisArg);
    };

    const db = new Dirty(dbPath);

    db.on('load', (count: number) => {
      Array.prototype.forEach = originalForEach;
      try {
        expect(count).toBe(2);
        // In original code, forEach callbacks return '' (empty string)
        // In mutated code, they return "Stryker was here!"
        const dataRowReturns = returnValues.filter(v => v === '' || v === 'Stryker was here!');
        expect(dataRowReturns.length).toBeGreaterThan(0);
        expect(dataRowReturns.every(v => v === '')).toBe(true);
        try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}
        done();
      } catch (err) {
        try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}
        done(err);
      }
    });

    db.on('error', (err: Error) => {
      Array.prototype.forEach = originalForEach;
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}
      done(err);
    });
  });
});