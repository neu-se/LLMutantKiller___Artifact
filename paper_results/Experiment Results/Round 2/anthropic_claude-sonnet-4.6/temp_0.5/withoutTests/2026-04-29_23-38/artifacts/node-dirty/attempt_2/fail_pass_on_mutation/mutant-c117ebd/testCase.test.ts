import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty database reading with utf-8 encoding', () => {
  it('should correctly load multi-byte unicode data from an existing database file', (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-test-encoding-${process.pid}.db`);

    // Use multi-byte UTF-8 characters that would cause byte offset vs char offset mismatch
    // The key insight: with encoding:"", chunk is a Buffer and chunk.lastIndexOf('\n')
    // returns a byte index. When concatenated to string buffer via +=, Buffer.toString()
    // is called (UTF-8 by default). However, the byte index from lastIndexOf on Buffer
    // is used to check === -1, which still works for detecting newlines.
    // The real difference: with encoding:'utf-8', stream handles multi-byte char boundaries.
    // With encoding:"", a multi-byte char could be split across chunks causing corruption.
    
    // Create a large file to force multiple chunks, with multi-byte chars near chunk boundaries
    const rows: string[] = [];
    // Add many rows with multi-byte characters to increase chance of chunk boundary split
    for (let i = 0; i < 1000; i++) {
      rows.push(JSON.stringify({ key: `key${i}`, val: `value-\u00e9\u00e0\u00fc\u4e2d\u6587-${i}` }) + '\n');
    }
    const content = rows.join('');
    fs.writeFileSync(dbPath, content, 'utf-8');

    const errors: Error[] = [];
    const db = new Dirty(dbPath);

    db.on('error', (err: Error) => {
      errors.push(err);
    });

    db.on('load', (count: number) => {
      try {
        // With utf-8 encoding on readStream, all rows parse correctly
        // With encoding:"", multi-byte chars split across Buffer chunks cause corruption
        expect(errors.length).toBe(0);
        expect(count).toBe(1000);
        expect(db.get('key0')).toEqual(`value-\u00e9\u00e0\u00fc\u4e2d\u6587-0`);
        expect(db.get('key999')).toEqual(`value-\u00e9\u00e0\u00fc\u4e2d\u6587-999`);
        
        db.close();
        db.once('write_close', () => {
          try { fs.unlinkSync(dbPath); } catch (e) {}
          done();
        });
      } catch (err) {
        try { fs.unlinkSync(dbPath); } catch (e) {}
        done(err);
      }
    });
  });
});