import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty database file loading', () => {
  it('should load existing data from a database file on startup', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    
    // Write some valid dirty db rows to the file
    const row1 = JSON.stringify({ key: 'foo', val: 'bar' }) + '\n';
    const row2 = JSON.stringify({ key: 'baz', val: 42 }) + '\n';
    fs.writeFileSync(dbPath, row1 + row2, 'utf-8');
    
    const db = new Dirty(dbPath);
    
    db.on('load', (count: number) => {
      try {
        expect(count).toBe(2);
        expect(db.get('foo')).toBe('bar');
        expect(db.get('baz')).toBe(42);
        db.close();
        // Cleanup
        fs.rmSync(tmpDir, { recursive: true });
        done();
      } catch (err) {
        fs.rmSync(tmpDir, { recursive: true });
        done(err);
      }
    });
    
    db.on('error', (err: Error) => {
      fs.rmSync(tmpDir, { recursive: true });
      done(err);
    });
  });
});