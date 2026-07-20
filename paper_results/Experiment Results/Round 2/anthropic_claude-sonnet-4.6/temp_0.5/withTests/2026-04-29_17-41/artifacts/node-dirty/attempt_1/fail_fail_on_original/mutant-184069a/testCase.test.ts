import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty error handling', () => {
  it('should emit error event for non-ENOENT file errors', (done) => {
    // Create a temp directory and use it as a file path (causes EISDIR, not ENOENT)
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dirPath = tmpDir; // Using a directory as a file path causes EISDIR error
    
    const db = new Dirty(dirPath);
    
    db.on('error', (err) => {
      expect(err.code).not.toBe('ENOENT');
      // Clean up
      fs.rmdirSync(tmpDir);
      done();
    });
    
    db.on('load', () => {
      // Should not reach here for non-ENOENT errors
      fs.rmdirSync(tmpDir);
      done(new Error('Should not have emitted load for non-ENOENT error'));
    });
  });
});