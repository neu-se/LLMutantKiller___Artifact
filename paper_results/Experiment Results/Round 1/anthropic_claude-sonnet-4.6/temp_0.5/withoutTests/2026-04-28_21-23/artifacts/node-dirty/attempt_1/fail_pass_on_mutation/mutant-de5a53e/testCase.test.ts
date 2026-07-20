import { EventEmitter } from 'events';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty close() write stream behavior', () => {
  it('should emit write_close event after close() is called', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    
    const db = new Dirty(dbPath);
    
    db.once('load', () => {
      // Set a value to ensure write stream is active
      db.set('key1', { value: 'test' }, () => {
        // Now close the db and wait for write_close event
        let writeCloseFired = false;
        
        db.once('write_close', () => {
          writeCloseFired = true;
        });
        
        db.close();
        
        // Give time for events to fire
        setTimeout(() => {
          // Cleanup
          try { fs.rmSync(tmpDir, { recursive: true }); } catch (e) {}
          
          if (writeCloseFired) {
            done();
          } else {
            done(new Error('write_close event was not emitted after close()'));
          }
        }, 500);
      });
    });
  });
});