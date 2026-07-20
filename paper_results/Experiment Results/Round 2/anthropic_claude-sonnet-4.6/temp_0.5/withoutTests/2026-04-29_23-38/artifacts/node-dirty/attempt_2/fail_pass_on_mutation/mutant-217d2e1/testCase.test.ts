import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty - corrupted row return value', () => {
  it('should not process the corrupted row key after error and return empty string from forEach callback', (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `test-dirty-${Date.now()}.db`);
    // A row where JSON parses but has no 'key' field - triggers the catch block
    const content = '{"nokey":"val"}\n{"key":"valid","val":42}\n';
    fs.writeFileSync(dbPath, content, 'utf-8');
    const db = new Dirty(dbPath);
    const errors: Error[] = [];
    db.on('error', (err: Error) => errors.push(err));
    db.on('load', (count: number) => {
      try {
        expect(count).toBe(1);
        expect(db.get('valid')).toBe(42);
        expect(errors).toHaveLength(1);
        done();
      } catch(e) { done(e); } finally { try { fs.unlinkSync(dbPath); } catch {} }
    });
  });
});