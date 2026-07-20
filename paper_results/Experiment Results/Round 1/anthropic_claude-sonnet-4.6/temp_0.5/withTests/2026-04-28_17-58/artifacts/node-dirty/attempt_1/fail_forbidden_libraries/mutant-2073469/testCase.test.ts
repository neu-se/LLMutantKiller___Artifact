import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('drain event after write stream backpressure', () => {
  it('should emit drain event when write stream drains with empty queue', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-test-${Date.now()}.dirty`);
    const db = new Dirty(tmpFile);
    
    // Write a very large value to force backpressure
    const largeValue = 'x'.repeat(1024 * 1024 * 10); // 10MB
    
    db.on('load', () => {
      db.on('drain', () => {
        fs.unlinkSync(tmpFile);
        done();
      });
      db.set('key', largeValue);
    });
  }, 10000);
});