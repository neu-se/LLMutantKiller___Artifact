import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('dirty db encoding', () => {
  it('should correctly persist and reload many records', (done) => {
    const file = path.join(os.tmpdir(), `dirty-many-${Date.now()}.dirty`);
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    
    const db1 = new Dirty(file);
    const records: Record<string, string> = {};
    
    // Include various Unicode characters
    const testData = [
      ['ascii', 'hello world'],
      ['unicode', '\u00e9\u00e0\u00fc\u00f6'],
      ['emoji', '\u2764\ufe0f'],
      ['chinese', '\u4e2d\u6587'],
      ['arabic', '\u0645\u0631\u062d\u0628\u0627'],
    ];
    
    db1.on('load', () => {
      let pending = testData.length;
      
      for (const [key, val] of testData) {
        records[key] = val;
        db1.set(key, val, (err: Error | null) => {
          if (err) {
            try { fs.unlinkSync(file); } catch (_) {}
            return done(err);
          }
          if (--pending === 0) {
            db1.close();
            db1.on('write_close', () => {
              const db2 = new Dirty(file);
              db2.on('load', (length: number) => {
                try { fs.unlinkSync(file); } catch (_) {}
                expect(length).toBe(testData.length);
                for (const [key, val] of testData) {
                  expect(db2.get(key)).toBe(val);
                }
                done();
              });
              db2.on('error', (err: Error) => {
                try { fs.unlinkSync(file); } catch (_) {}
                done(err);
              });
            });
          }
        });
      }
    });
    
    db1.on('error', (err: Error) => {
      try { fs.unlinkSync(file); } catch (_) {}
      done(err);
    });
  });
});