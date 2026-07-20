import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('dirty corrupted row return value', () => {
  it('forEach callback returns empty string on corrupted row in original code', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-return-test-${Date.now()}.dirty`);

    const content = 'CORRUPTED_ROW\n{"key":"k","val":"v"}\n';
    fs.writeFileSync(file, content, 'utf-8');

    const originalForEach = Array.prototype.forEach;
    const returnValues: any[] = [];

    // Intercept forEach to capture return values from callbacks
    (Array.prototype as any).forEach = function(callback: Function, thisArg?: any) {
      return originalForEach.call(this, function(...args: any[]) {
        const result = callback.apply(thisArg, args);
        returnValues.push(result);
        return result;
      }, thisArg);
    };

    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(file);

    db.on('error', () => {});
    db.on('load', () => {
      Array.prototype.forEach = originalForEach;
      try {
        // In original: corrupted row callback returns ''
        // In mutated: corrupted row callback returns "Stryker was here!"
        const corruptedRowReturn = returnValues.find(v => v === '' || v === 'Stryker was here!');
        expect(corruptedRowReturn).toBe('');
        fs.unlinkSync(file);
        done();
      } catch (e) {
        try { fs.unlinkSync(file); } catch (_) {}
        done(e);
      }
    });
  });
});