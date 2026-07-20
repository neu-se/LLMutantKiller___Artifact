import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

describe('Dirty close()', () => {
  it('should explicitly call destroy() on write stream in end() callback', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const originalCreateWriteStream = fs.createWriteStream;
    let capturedStream: any = null;

    (fs as any).createWriteStream = function(filePath: any, options: any) {
      const stream = originalCreateWriteStream.call(fs, filePath, {
        ...(options || {}),
        autoClose: false,
        autoDestroy: false,
      });
      capturedStream = stream;
      return stream;
    };

    const modulePath = require.resolve('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    delete require.cache[modulePath];
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    
    const db = new Dirty(dbPath);

    db.once('load', () => {
      (fs as any).createWriteStream = originalCreateWriteStream;
      
      // capturedStream is the write stream with autoClose: false, autoDestroy: false
      // Now spy on destroy
      let destroyCalled = false;
      const originalDestroy = capturedStream.destroy.bind(capturedStream);
      capturedStream.destroy = function(...args: any[]) {
        destroyCalled = true;
        return originalDestroy(...args);
      };

      // Also listen for 'finish' to check if destroy is called during finish
      let destroyCalledDuringFinishCallback = false;
      capturedStream.once('finish', () => {
        // This fires synchronously during 'finish' event
        // The end() callback also fires during 'finish'
        // We check after all 'finish' listeners have run
        setImmediate(() => {
          try { fs.rmSync(tmpDir, { recursive: true }); } catch (e) {}
          if (destroyCalled) {
            done();
          } else {
            done(new Error('destroy() was not called - stream will not emit close event'));
          }
        });
      });

      db.close();
    });
  });
});