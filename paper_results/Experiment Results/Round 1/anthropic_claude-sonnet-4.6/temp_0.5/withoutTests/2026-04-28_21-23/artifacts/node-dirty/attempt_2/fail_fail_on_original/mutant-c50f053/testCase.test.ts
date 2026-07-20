import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty error emission without callbacks', () => {
  it('should emit error event when write fails and no callback is provided', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    
    const db = new Dirty(dbPath);
    
    db.once('load', () => {
      const timeout = setTimeout(() => {
        try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
        done(new Error('Expected error event was never emitted'));
      }, 2000);
      
      db.once('error', (err) => {
        clearTimeout(timeout);
        try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
        expect(err).toBeTruthy();
        done();
      });
      
      // End the write stream gracefully first, then set without callback
      // This will cause the write to fail since stream is ended
      db._writeStream.end(() => {
        // Now set without callback - write will fail, should emit error
        db.set('testKey', { value: 'testValue' });
      });
    });
  });
});