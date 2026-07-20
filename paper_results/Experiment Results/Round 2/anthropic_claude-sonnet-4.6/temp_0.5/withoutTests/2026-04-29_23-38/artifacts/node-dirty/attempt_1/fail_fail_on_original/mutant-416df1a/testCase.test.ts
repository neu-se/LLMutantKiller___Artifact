import { tmpdir } from 'os';
import { join } from 'path';
import { writeFileSync, chmodSync, unlinkSync, existsSync } from 'fs';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty error emission without callbacks', () => {
  it('should emit error when write fails and no callback is provided', (done) => {
    const tmpPath = join(tmpdir(), `dirty-test-${Date.now()}.db`);
    
    // Create the file first
    writeFileSync(tmpPath, '');
    
    const db = new Dirty(tmpPath);
    
    db.on('load', () => {
      // Make the file read-only to cause write errors
      chmodSync(tmpPath, 0o444);
      
      db.on('error', (err) => {
        // Original code emits error when no callback and write fails
        expect(err).toBeTruthy();
        chmodSync(tmpPath, 0o644);
        if (existsSync(tmpPath)) unlinkSync(tmpPath);
        done();
      });
      
      // Call set WITHOUT a callback - cbs will be empty
      db.set('testKey', 'testValue');
    });
  });
});