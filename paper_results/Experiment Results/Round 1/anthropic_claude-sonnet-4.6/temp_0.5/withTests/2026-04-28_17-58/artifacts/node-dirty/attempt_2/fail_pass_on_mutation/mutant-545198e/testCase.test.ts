import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty', () => {
  it('should load all records correctly without corruption errors when data spans multiple chunks', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `test-dirty-mut-${process.pid}.dirty`);
    
    // Write a file with enough data to potentially span multiple chunks
    const records: string[] = [];
    for (let i = 0; i < 100; i++) {
      records.push(JSON.stringify({ key: `key${i}`, val: `value${i}` }));
    }
    const content = records.join('\n') + '\n';
    fs.writeFileSync(file, content, 'utf-8');

    const errors: Error[] = [];
    const db = new Dirty(file);
    
    db.on('error', (err: Error) => {
      errors.push(err);
    });
    
    db.on('load', (length: number) => {
      try {
        expect(errors).toHaveLength(0);
        expect(length).toBe(100);
        for (let i = 0; i < 100; i++) {
          expect(db.get(`key${i}`)).toBe(`value${i}`);
        }
        fs.unlinkSync(file);
        done();
      } catch (e) {
        try { fs.unlinkSync(file); } catch (_) {}
        done(e);
      }
    });
  });
});