import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty db forEach callback return value', () => {
  it('should process all rows even when forEach callback returns a value', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-foreach-test-${process.pid}.dirty`);
    // Use a large file to force multiple data chunks
    const rows: string[] = [];
    for (let i = 0; i < 1000; i++) {
      rows.push(JSON.stringify({key: `k${i}`, val: i}));
    }
    fs.writeFileSync(tmpFile, rows.join('\n') + '\n');
    
    const originalForEach = Array.prototype.forEach;
    const returnValues: unknown[] = [];
    Array.prototype.forEach = function(cb: (item: unknown, index: number, arr: unknown[]) => unknown, thisArg?: unknown) {
      const wrappedCb = function(item: unknown, index: number, arr: unknown[]) {
        const ret = cb.call(thisArg, item, index, arr);
        returnValues.push(ret);
        return ret;
      };
      return originalForEach.call(this, wrappedCb, thisArg);
    } as typeof Array.prototype.forEach;

    const db = new Dirty(tmpFile);
    db.on('load', (size: number) => {
      Array.prototype.forEach = originalForEach;
      expect(size).toBe(1000);
      const nonEmptyReturns = returnValues.filter(v => v !== '');
      expect(nonEmptyReturns.length).toBe(0);
      try { fs.unlinkSync(tmpFile); } catch (_) {}
      done();
    });
  });
});