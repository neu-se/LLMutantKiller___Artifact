import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { rimrafSync } from 'rimraf';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('drain event after write stream backpressure', () => {
  it('should emit drain event after write stream drains when queue is empty', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const file = path.join(tmpDir, 'test.dirty');

    const db = new Dirty(file);
    
    db.on('load', () => {
      // Write a large amount of data to trigger backpressure on the write stream
      const largeValue = 'x'.repeat(65536); // 64KB to trigger backpressure
      let drainCount = 0;
      
      // Set many large values to force backpressure
      for (let i = 0; i < 20; i++) {
        db.set(`key${i}`, largeValue);
      }
      
      db.once('drain', () => {
        rimrafSync(tmpDir);
        done();
      });
    });

    // Timeout safety
    setTimeout(() => {
      rimrafSync(tmpDir);
      done(new Error('Timed out waiting for drain event'));
    }, 5000);
  });
});