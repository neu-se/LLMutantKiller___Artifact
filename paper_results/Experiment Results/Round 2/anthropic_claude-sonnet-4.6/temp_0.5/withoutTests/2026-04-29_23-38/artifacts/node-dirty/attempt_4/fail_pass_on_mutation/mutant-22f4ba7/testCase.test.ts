import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty close() ordering', () => {
  it('should emit drain before write_close when close is called with pending writes', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    db.on('load', () => {
      const events: string[] = [];

      // In original: close() defers via once('drain', close), so drain fires,
      // then close() is called again, then write_close fires.
      // In mutated: close() calls writeStream.end() immediately, 
      // write_close fires without a preceding drain event from dirty.

      db.once('drain', () => events.push('drain'));
      db.once('write_close', () => {
        events.push('write_close');
        
        // In original code: drain must have fired before write_close
        // because close() waits for drain before ending the stream
        expect(events).toEqual(['drain', 'write_close']);
        
        fs.rmSync(tmpDir, { recursive: true });
        done();
      });

      // Trigger writes then immediately close
      db.set('key1', 'val1');
      db.set('key2', 'val2');
      
      // Force close before drain can fire
      setImmediate(() => {
        db.close();
      });
    });
  });
});