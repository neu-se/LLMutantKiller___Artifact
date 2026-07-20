import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty write stream encoding', () => {
  it('should correctly persist and reload data written to disk', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);
    
    db.on('load', () => {
      // Set a value and wait for it to be persisted
      db.set('testKey', { message: 'hello world', num: 42 }, () => {
        db.close();
        
        // After close, reopen the database and verify data persisted correctly
        db.once('write_close', () => {
          // Read the file content directly to verify it was written correctly
          const fileContent = fs.readFileSync(dbPath, 'utf-8');
          
          // The file should contain valid UTF-8 JSON
          const lines = fileContent.trim().split('\n');
          expect(lines.length).toBeGreaterThan(0);
          
          let parsed;
          try {
            parsed = JSON.parse(lines[lines.length - 1]);
          } catch (e) {
            // If parsing fails, the test should fail
            fs.rmSync(tmpDir, { recursive: true });
            done(new Error(`Failed to parse written data: ${e}`));
            return;
          }
          
          expect(parsed.key).toBe('testKey');
          expect(parsed.val).toEqual({ message: 'hello world', num: 42 });
          
          // Now reload the database to verify round-trip
          const db2 = new Dirty(dbPath);
          db2.on('load', (count) => {
            expect(count).toBe(1);
            const val = db2.get('testKey');
            expect(val).toEqual({ message: 'hello world', num: 42 });
            
            db2.close();
            db2.once('write_close', () => {
              fs.rmSync(tmpDir, { recursive: true });
              done();
            });
          });
          
          db2.on('error', (err) => {
            fs.rmSync(tmpDir, { recursive: true });
            done(err);
          });
        });
      });
    });
    
    db.on('error', (err) => {
      try {
        fs.rmSync(tmpDir, { recursive: true });
      } catch (_) {}
      done(err);
    });
  });
});