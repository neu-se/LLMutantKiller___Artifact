import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';
import { rimraf } from 'rimraf';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event behavior', () => {
  it('should emit drain only after all queued writes are completed, not while queue still has items', (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-test-${Date.now()}.db`);

    const db = new Dirty(dbPath);
    
    db.on('load', () => {
      const callbacksCompleted: string[] = [];
      let drainFiredAt: number | null = null;
      
      // Write multiple keys - the drain event should only fire after all writes complete
      db.set('key1', { data: 'value1' }, () => {
        callbacksCompleted.push('key1');
      });
      
      db.set('key2', { data: 'value2' }, () => {
        callbacksCompleted.push('key2');
      });
      
      db.set('key3', { data: 'value3' }, () => {
        callbacksCompleted.push('key3');
      });
      
      db.on('drain', () => {
        drainFiredAt = callbacksCompleted.length;
        
        // When drain fires, the queue should be empty (all writes done)
        // In original: drain fires when queue is empty (all 3 callbacks should be done)
        // In mutated: drain fires when queue is NOT empty (wrong timing)
        expect(db._queue.size).toBe(0);
        
        // Verify the db actually has the data
        expect(db.get('key1')).toEqual({ data: 'value1' });
        expect(db.get('key2')).toEqual({ data: 'value2' });
        expect(db.get('key3')).toEqual({ data: 'value3' });
        
        db.close();
        
        db.on('write_close', () => {
          rimraf(dbPath).then(() => done()).catch(done);
        });
      });
    });
    
    db.on('error', done);
  });
});