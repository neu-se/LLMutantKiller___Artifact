import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('dirty', () => {
  it('should load all records correctly from a file read across multiple chunks', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-multi-chunk-${Date.now()}.dirty`);

    // Create many records to ensure the file is large enough to be read in multiple chunks
    // Each record is ~50 bytes, 2000 records = ~100KB > default 64KB highWaterMark
    const numRecords = 2000;
    const lines: string[] = [];
    for (let i = 0; i < numRecords; i++) {
      lines.push(JSON.stringify({ key: `key${String(i).padStart(6, '0')}`, val: `value${i}` }));
    }
    fs.writeFileSync(file, lines.join('\n') + '\n', 'utf-8');

    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(file);

    const errors: Error[] = [];
    db.on('error', (err: Error) => errors.push(err));

    db.on('load', (length: number) => {
      try {
        expect(errors).toHaveLength(0);
        expect(length).toBe(numRecords);
        // Spot-check several records
        expect(db.get('key000000')).toBe('value0');
        expect(db.get('key001000')).toBe('value1000');
        expect(db.get('key001999')).toBe('value1999');
        fs.unlinkSync(file);
        done();
      } catch (err) {
        try { fs.unlinkSync(file); } catch (_) {}
        done(err);
      }
    });
  });
});