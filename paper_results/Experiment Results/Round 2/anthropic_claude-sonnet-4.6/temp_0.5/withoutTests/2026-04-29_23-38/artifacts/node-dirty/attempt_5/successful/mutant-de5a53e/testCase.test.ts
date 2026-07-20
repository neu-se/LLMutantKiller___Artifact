import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

describe('Dirty close() write stream destroy', () => {
  it('should call destroy() on write stream in end() callback', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(dbPath);

    db.once('load', () => {
      const writeStream = (db as any)._writeStream;

      // Disable autoClose so the stream doesn't auto-close after 'finish'
      writeStream.autoClose = false;
      // Remove existing 'finish' listeners (autoClose/autoDestroy handlers)
      // so only the end() callback's destroy() call matters
      writeStream.removeAllListeners('finish');

      let destroyCalled = false;
      const originalDestroy = writeStream.destroy.bind(writeStream);
      writeStream.destroy = function(...args: any[]) {
        destroyCalled = true;
        return originalDestroy(...args);
      };

      // Add our finish listener BEFORE calling close() so it fires
      // after the end() callback (which is registered by close())
      writeStream.once('finish', () => {
        setImmediate(() => {
          try { fs.rmSync(tmpDir, { recursive: true }); } catch (e) {}
          if (destroyCalled) {
            done();
          } else {
            done(new Error('destroy() was not called on write stream in end() callback'));
          }
        });
      });

      db.close();
    });
  });
});