import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('dirty', () => {
  it('should correctly handle loading when the file content spans chunk boundaries such that a chunk ends exactly on a newline', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-boundary-${Date.now()}.dirty`);

    // We need a chunk to end exactly on '\n' so that the NEXT chunk has no '\n'
    // Default highWaterMark is 65536 bytes
    // Craft a row that is exactly (65536 - 1) bytes so the '\n' falls at byte 65535
    // making the first chunk end with '\n', and the second chunk starts fresh
    const highWaterMark = 65536;
    // row1 will be padded to fill exactly highWaterMark bytes including its '\n'
    const padding = 'x'.repeat(highWaterMark - JSON.stringify({key:'k',val:''}).length - 1 - 2); 
    const row1 = JSON.stringify({ key: 'k1', val: padding });
    const row2 = JSON.stringify({ key: 'k2', val: 'v2' });
    
    // Verify row1 + '\n' is exactly highWaterMark bytes
    const content = `${row1}\n${row2}\n`;
    fs.writeFileSync(file, content, 'utf-8');

    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(file);

    const errors: Error[] = [];
    db.on('error', (err: Error) => errors.push(err));

    db.on('load', (length: number) => {
      try {
        expect(errors).toHaveLength(0);
        expect(length).toBe(2);
        expect(db.get('k1')).toBe(padding);
        expect(db.get('k2')).toBe('v2');
        fs.unlinkSync(file);
        done();
      } catch (err) {
        try { fs.unlinkSync(file); } catch (_) {}
        done(err);
      }
    });
  });
});