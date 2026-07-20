import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty _flush backpressure handling', () => {
  it('should emit drain exactly once after multiple sets that trigger backpressure', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-test-${Date.now()}-${Math.floor(Math.random() * 10000)}.dirty`);
    
    const db = new Dirty(file);
    let drainCount = 0;
    
    db.on('load', () => {
      // Write many large values to trigger backpressure
      const largeVal = 'x'.repeat(65536);
      
      for (let i = 0; i < 100; i++) {
        db.set(`key${i}`, largeVal);
      }
      
      db.on('drain', () => {
        drainCount++;
        
        // Give time to see if drain fires multiple times
        setTimeout(() => {
          expect(drainCount).toBe(1);
          
          // Cleanup
          try { fs.unlinkSync(file); } catch (e) {}
          done();
        }, 200);
      });
    });
  });
});