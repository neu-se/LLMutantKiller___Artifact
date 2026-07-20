import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty database encoding', () => {
  it('should load database without errors using correct utf-8 stream encoding', (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-enc-${process.pid}.db`);

    // Write rows that when read as Buffer chunks and coerced via +=
    // would produce different results than when read as utf-8 strings
    // Specifically: test that the stream type (string vs Buffer) is correct
    // by checking if chunk operations work as expected in the data handler
    
    // The data handler does: buffer += chunk; if (chunk.lastIndexOf('\n') === -1) return;
    // When chunk is a Buffer: chunk.lastIndexOf('\n') searches for byte 0x0A - works fine
    // When chunk is a string: chunk.lastIndexOf('\n') searches for char - works fine
    // Both cases seem equivalent for ASCII...
    
    // BUT: what if Node.js rejects encoding:""? Let's check if it causes stream error
    const content = JSON.stringify({ key: 'a', val: 1 }) + '\n';
    fs.writeFileSync(dbPath, content, 'utf-8');

    const db = new Dirty(dbPath);
    let loadCount = -1;
    let errorOccurred = false;

    db.on('error', () => { errorOccurred = true; });
    db.on('load', (count: number) => {
      loadCount = count;
      try {
        expect(errorOccurred).toBe(false);
        expect(loadCount).toBe(1);
        expect(db.get('a')).toBe(1);
        done();
      } catch (err) {
        done(err);
      } finally {
        try { fs.unlinkSync(dbPath); } catch (e) {}
      }
    });
  });
});