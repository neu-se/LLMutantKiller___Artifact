import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

describe('Dirty close()', () => {
  it('should release file descriptor after close() by destroying write stream', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(dbPath);

    db.once('load', () => {
      // Get open file descriptors before close
      const getFdCount = () => {
        try {
          return fs.readdirSync('/proc/self/fd').length;
        } catch (e) {
          return -1; // Not on Linux
        }
      };

      const fdsBefore = getFdCount();
      
      // Wait for write_close or timeout
      let writeCloseFired = false;
      db.once('write_close', () => { writeCloseFired = true; });
      
      db.close();
      
      // After close, check if fd was released
      setTimeout(() => {
        const fdsAfter = getFdCount();
        try { fs.rmSync(tmpDir, { recursive: true }); } catch (e) {}
        
        // The write stream fd should be released
        // Original: destroy() called → fd closed
        // Mutated: destroy() not called → fd may still be open
        if (fdsAfter >= fdsBefore) {
          done(new Error(`File descriptor not released: before=${fdsBefore}, after=${fdsAfter}`));
        } else {
          done();
        }
      }, 200);
    });
  });
});