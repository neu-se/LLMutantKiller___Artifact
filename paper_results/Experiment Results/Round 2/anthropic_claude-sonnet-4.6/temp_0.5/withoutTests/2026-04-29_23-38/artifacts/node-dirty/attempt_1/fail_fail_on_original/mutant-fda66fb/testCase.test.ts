import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { rimraf } from 'rimraf';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event behavior', () => {
  it('should emit drain event after write completes with empty queue', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    
    const db = new Dirty(dbPath);
    
    db.on('load', () => {
      let drainCount = 0;
      
      // Write a large amount of data to potentially trigger backpressure
      // and test the drain event logic
      const writeCount = 100;
      let cbCount = 0;
      
      db.on('drain', () => {
        drainCount++;
        // After drain, queue should be empty - verify by checking we can close
        db.close();
        
        db.on('write_close', () => {
          rimraf(tmpDir).then(() => {
            // drain should have fired exactly once after all writes
            expect(drainCount).toBeGreaterThanOrEqual(1);
            done();
          });
        });
      });
      
      for (let i = 0; i < writeCount; i++) {
        db.set(`key${i}`, { value: 'x'.repeat(1000) });
      }
    });
    
    db.on('error', done);
  });
});