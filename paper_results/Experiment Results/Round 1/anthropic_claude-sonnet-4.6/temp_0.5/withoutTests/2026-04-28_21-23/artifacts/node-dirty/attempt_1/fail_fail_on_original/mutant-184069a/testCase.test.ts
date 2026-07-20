import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { rimraf } from 'rimraf';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty error handling', () => {
  it('should not emit load event when a non-ENOENT error occurs on read stream', (done) => {
    // Create a temp directory and use it as a file path (causes EISDIR, not ENOENT)
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dirPath = path.join(tmpDir, 'testdir');
    fs.mkdirSync(dirPath);
    
    // Use the directory path as the db path - reading a directory as a file causes an error
    const db = new Dirty(dirPath);
    
    let loadEmitted = false;
    let errorEmitted = false;
    
    db.on('load', () => {
      loadEmitted = true;
    });
    
    db.on('error', (err: Error) => {
      errorEmitted = true;
      // Give time for any spurious 'load' event
      setImmediate(() => {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        expect(loadEmitted).toBe(false);
        expect(errorEmitted).toBe(true);
        done();
      });
    });
  });
});