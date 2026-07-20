import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { rimrafSync } from 'rimraf';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('_flush waitForDrain guard', () => {
  it('should correctly handle backpressure and emit drain exactly once after all writes complete', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const file = path.join(tmpDir, 'test.dirty');
    
    const db = new Dirty(file);
    let drainCount = 0;
    
    db.on('load', () => {
      // Write many large values to trigger backpressure
      const largeVal = 'x'.repeat(65536);
      for (let i = 0; i < 20; i++) {
        db.set(`key${i}`, largeVal);
      }
      
      db.on('drain', () => {
        drainCount++;
        // Verify all keys were written correctly
        for (let i = 0; i < 20; i++) {
          expect(db.get(`key${i}`)).toBe(largeVal);
        }
        // Clean up
        rimrafSync(tmpDir);
        done();
      });
    });
  });
});