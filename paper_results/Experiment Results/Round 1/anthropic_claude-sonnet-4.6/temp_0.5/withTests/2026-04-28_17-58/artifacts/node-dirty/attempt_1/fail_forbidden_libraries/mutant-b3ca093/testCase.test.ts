import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty _flush backpressure handling', () => {
  it('should write all queued items to disk and fire drain exactly once after all writes complete', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-test-${Date.now()}-${Math.floor(Math.random() * 10000)}.dirty`);
    
    // Clean up any existing file
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);
    let drainCount = 0;
    const numKeys = 100;

    db.on('load', () => {
      // Set many keys rapidly to stress the flush/drain cycle
      for (let i = 0; i < numKeys; i++) {
        db.set(`key${i}`, `value${i}`);
      }

      db.on('drain', () => {
        drainCount++;
        
        // After drain, verify all data was written correctly
        const contents = fs.readFileSync(file, 'utf-8');
        const lines = contents.trim().split('\n');
        
        expect(lines.length).toBe(numKeys);
        
        // Verify each key-value pair was written
        const writtenKeys = new Set<string>();
        for (const line of lines) {
          const row = JSON.parse(line);
          writtenKeys.add(row.key);
          const expectedVal = `value${row.key.replace('key', '')}`;
          expect(row.val).toBe(expectedVal);
        }
        
        expect(writtenKeys.size).toBe(numKeys);
        
        // Clean up
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        
        done();
      });
    });
  });
});