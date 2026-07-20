import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { EventEmitter } from 'events';

describe('dirty error emission without callback', () => {
  it('should emit error event when write fails and no callback is provided', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const filePath = path.join(tmpDir, 'test.dirty');
    
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    
    const db = new Dirty(filePath);
    
    db.on('load', () => {
      // Destroy the write stream to cause write failures
      db._writeStream.destroy(new Error('Simulated write error'));
      
      db.on('error', (err: Error) => {
        expect(err).toBeTruthy();
        // Cleanup
        try { fs.rmSync(tmpDir, { recursive: true }); } catch (e) {}
        done();
      });
      
      // Set without callback - this means cbs.length === 0
      // When write fails, original code emits 'error', mutated code doesn't
      db.set('testKey', 'testValue');
    });
  });
});