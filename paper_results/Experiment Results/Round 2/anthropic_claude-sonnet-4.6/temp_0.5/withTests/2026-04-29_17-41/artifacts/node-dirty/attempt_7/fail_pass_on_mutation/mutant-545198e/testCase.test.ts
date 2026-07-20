import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty db', () => {
  it('should correctly load data from a file that requires multiple stream chunks to read', (done) => {
    const file = path.join(os.tmpdir(), `dirty-multi-${process.pid}-${Date.now()}.dirty`);
    
    // Create a file large enough to span multiple 64KB chunks
    // with lines that straddle chunk boundaries
    const records: string[] = [];
    let size = 0;
    let count = 0;
    
    // Add a very long first line that will span the first chunk boundary
    const longVal = 'x'.repeat(65000);
    records.push(JSON.stringify({ key: 'longkey', val: longVal }));
    size += records[0].length + 1;
    count++;
    
    // Add more records
    while (size < 200000) {
      const rec = JSON.stringify({ key: `k${count}`, val: `v${count}` });
      records.push(rec);
      size += rec.length + 1;
      count++;
    }
    
    const content = records.join('\n') + '\n';
    fs.writeFileSync(file, content, 'utf-8');
    
    const db = new Dirty(file);
    const errors: Error[] = [];
    
    db.on('error', (err: Error) => errors.push(err));
    
    db.on('load', (loadedSize: number) => {
      try {
        expect(errors).toHaveLength(0);
        expect(loadedSize).toBe(count);
        expect(db.get('longkey')).toBe(longVal);
        done();
      } catch (e) {
        done(e);
      } finally {
        try { fs.unlinkSync(file); } catch (_) {}
      }
    });
  });
});