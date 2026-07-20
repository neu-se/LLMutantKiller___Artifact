import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty', () => {
  it('should correctly load a large database where records span multiple chunks', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `test-dirty-large-${process.pid}.dirty`);
    
    // Create records large enough to span multiple 64KB chunks
    const records: string[] = [];
    const longValue = 'x'.repeat(100000); // 100KB value
    records.push(JSON.stringify({ key: 'bigkey', val: longValue }));
    records.push(JSON.stringify({ key: 'small', val: 'tiny' }));
    const content = records.join('\n') + '\n';
    fs.writeFileSync(file, content, 'utf-8');

    const db = new Dirty(file);
    
    db.on('error', (err: Error) => {
      try { fs.unlinkSync(file); } catch (_) {}
      done(err);
    });
    
    db.on('load', (length: number) => {
      try {
        expect(length).toBe(2);
        expect(db.get('bigkey')).toBe(longValue);
        expect(db.get('small')).toBe('tiny');
        fs.unlinkSync(file);
        done();
      } catch (e) {
        try { fs.unlinkSync(file); } catch (_) {}
        done(e);
      }
    });
  });
});