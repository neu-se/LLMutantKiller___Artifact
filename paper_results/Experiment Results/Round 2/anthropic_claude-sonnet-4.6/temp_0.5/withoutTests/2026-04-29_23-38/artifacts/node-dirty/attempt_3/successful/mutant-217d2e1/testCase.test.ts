import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty - corrupted row forEach return value', () => {
  it('should return empty string from forEach callback on corrupted row', (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `test-dirty-${Date.now()}.db`);
    const content = '{"nokey":"val"}\n';
    fs.writeFileSync(dbPath, content, 'utf-8');

    const returnValues: unknown[] = [];
    const originalForEach = Array.prototype.forEach;
    (Array.prototype as any).forEach = function(this: unknown[], fn: (...args: unknown[]) => unknown, thisArg?: unknown) {
      const wrappedFn = (...args: unknown[]) => {
        const ret = fn.apply(thisArg, args);
        returnValues.push(ret);
        return ret;
      };
      return originalForEach.call(this, wrappedFn);
    };

    import('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js').then((mod) => {
      const Dirty = mod.default || mod.Dirty || mod;
      const db = new Dirty(dbPath);
      db.on('error', () => {});
      db.on('load', () => {
        (Array.prototype as any).forEach = originalForEach;
        try {
          const hasEmptyString = returnValues.some(v => v === '');
          const hasStryker = returnValues.some(v => v === 'Stryker was here!');
          expect(hasEmptyString).toBe(true);
          expect(hasStryker).toBe(false);
          done();
        } catch(e) { done(e); } finally { try { fs.unlinkSync(dbPath); } catch {} }
      });
    });
  });
});