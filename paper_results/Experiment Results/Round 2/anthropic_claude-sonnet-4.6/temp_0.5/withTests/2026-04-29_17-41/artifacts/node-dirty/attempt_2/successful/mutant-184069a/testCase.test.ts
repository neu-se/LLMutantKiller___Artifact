import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('dirty error handling', () => {
  it('should emit error event for non-ENOENT errors, not load event', (done) => {
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const tmpFile = path.join(os.tmpdir(), `dirty-perm-test-${process.pid}.dirty`);
    
    // Create file and make it write-only (read stream will get EACCES, write stream will succeed)
    fs.writeFileSync(tmpFile, '', { mode: 0o200 });
    
    let finished = false;
    const finish = (err?: Error) => {
      if (finished) return;
      finished = true;
      try { 
        fs.chmodSync(tmpFile, 0o644); 
        fs.unlinkSync(tmpFile); 
      } catch(e) {}
      done(err);
    };

    const db = new Dirty(tmpFile);
    
    db.on('load', () => {
      finish(new Error('load should not be emitted for non-ENOENT errors (EACCES should emit error)'));
    });
    
    db.on('error', (err: any) => {
      // In original code, EACCES error should reach here
      // In mutated code (if true), it would emit 'load' instead
      finish();
    });
  });
});