import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event after write stream drain', () => {
  it('should emit drain event after writing to a file-backed database', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    
    const db = new Dirty(dbPath);
    
    db.on('load', () => {
      db.on('drain', () => {
        // Clean up
        try {
          db.close();
          db.on('write_close', () => {
            try {
              fs.rmSync(tmpDir, { recursive: true });
            } catch (e) {
              // ignore cleanup errors
            }
          });
        } catch (e) {
          // ignore
        }
        done();
      });
      
      // Set a value - this should eventually emit 'drain'
      db.set('testKey', { value: 'testValue' });
    });
    
    db.on('error', (err: Error) => {
      done(err);
    });
  }, 5000);
});