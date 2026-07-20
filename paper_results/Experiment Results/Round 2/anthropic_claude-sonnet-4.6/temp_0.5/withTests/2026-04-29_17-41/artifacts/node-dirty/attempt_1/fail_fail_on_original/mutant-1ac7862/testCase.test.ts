import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('flush loop processes all queued keys in single flush', () => {
  it('should invoke callbacks for all keys set before drain fires', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-test-${Date.now()}-${Math.floor(Math.random() * 1000000)}.dirty`);
    
    const db = new (Dirty as any)(tmpFile);
    
    db.on('load', () => {
      const callbacksFired: string[] = [];
      let drainFired = false;
      
      // Set multiple keys before any flush can happen
      db.set('key1', 'val1', (err: Error | null) => {
        callbacksFired.push('key1');
      });
      db.set('key2', 'val2', (err: Error | null) => {
        callbacksFired.push('key2');
      });
      db.set('key3', 'val3', (err: Error | null) => {
        callbacksFired.push('key3');
      });
      
      db.on('drain', () => {
        if (drainFired) return;
        drainFired = true;
        
        try {
          // All three callbacks should have fired by the time drain fires
          // In the mutated code, only key1's callback fires before the first drain
          // because the loop always breaks after the first key
          expect(callbacksFired).toContain('key1');
          expect(callbacksFired).toContain('key2');
          expect(callbacksFired).toContain('key3');
          expect(callbacksFired.length).toBe(3);
          
          // Cleanup
          db.close();
          db.on('write_close', () => {
            try { fs.unlinkSync(tmpFile); } catch (e) { /* ignore */ }
            done();
          });
        } catch (e) {
          try { fs.unlinkSync(tmpFile); } catch (err) { /* ignore */ }
          done(e);
        }
      });
    });
  });
});