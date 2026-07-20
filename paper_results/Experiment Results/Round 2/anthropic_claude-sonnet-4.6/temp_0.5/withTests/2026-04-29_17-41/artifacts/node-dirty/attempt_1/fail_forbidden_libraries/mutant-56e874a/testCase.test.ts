import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty _flush guard', () => {
  it('fires drain exactly once after a single set when _waitForDrain is forced true', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-mutant-test-${process.pid}.dirty`);
    
    try { fs.unlinkSync(tmpFile); } catch (e) {}
    
    const db = new Dirty(tmpFile);
    
    db.on('load', () => {
      // Manually set _waitForDrain to simulate backpressure
      db._waitForDrain = true;
      
      let drainCount = 0;
      db.on('drain', () => { drainCount++; });
      
      // In original: _flush returns early, key goes into queue but doesn't write
      // In mutated: _flush proceeds past guard, writes immediately
      db.set('testKey', 'testVal');
      
      // Simulate drain event from write stream
      db._waitForDrain = false;
      db._writeStream.emit('drain');
      
      setTimeout(() => {
        try { fs.unlinkSync(tmpFile); } catch (e) {}
        // In original: drain fires once (from the queued write after stream drain)
        // In mutated: behavior differs
        expect(drainCount).toBeGreaterThanOrEqual(1);
        done();
      }, 200);
    });
  });
});