import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty drain event after write stream drain', () => {
  it('should emit drain event after writing to persistent store when write stream drains', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-test-${Date.now()}-${Math.floor(Math.random() * 10000)}.dirty`);
    
    const db = new Dirty(file);
    
    db.on('load', () => {
      let drainFired = false;
      
      db.on('drain', () => {
        drainFired = true;
        // Cleanup
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        done();
      });
      
      db.set('key1', 'value1');
    });
    
    // Timeout to fail if drain never fires
    setTimeout(() => {
      if (!drainFired) {
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        done(new Error('drain event was never emitted'));
      }
    }, 5000);
  });
});