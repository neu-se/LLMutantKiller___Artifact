import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty read stream encoding', () => {
  it('should successfully load data from a file using valid UTF-8 encoding', (done) => {
    // Create a temporary directory and file
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    
    // Write some valid dirty db content
    const row = JSON.stringify({ key: 'testKey', val: 'testValue' }) + '\n';
    fs.writeFileSync(dbPath, row, 'utf-8');
    
    const db = new Dirty(dbPath);
    
    db.on('error', (err: Error) => {
      // Clean up
      try { fs.rmSync(tmpDir, { recursive: true }); } catch (e) {}
      done(err);
    });
    
    db.on('load', (count: number) => {
      try {
        expect(count).toBe(1);
        expect(db.get('testKey')).toBe('testValue');
        db.close();
        // Clean up
        db.once('write_close', () => {
          try { fs.rmSync(tmpDir, { recursive: true }); } catch (e) {}
          done();
        });
      } catch (e) {
        try { fs.rmSync(tmpDir, { recursive: true }); } catch (e2) {}
        done(e);
      }
    });
  });
});