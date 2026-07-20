import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty close() calls destroy on write stream', () => {
  it('should call destroy() on the write stream in the end() callback', (done) => {
    const file = path.join(os.tmpdir(), `dirty-test-${process.pid}.dirty`);
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    // Clear module cache to get fresh Dirty
    jest.resetModules();
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(file);

    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        const ws = db._writeStream;
        let destroyCalled = false;
        const originalDestroy = ws.destroy.bind(ws);
        ws.destroy = jest.fn((...args: any[]) => {
          destroyCalled = true;
          return originalDestroy(...args);
        });

        db.on('write_close', () => {
          try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
          expect(destroyCalled).toBe(true);
          done();
        });

        db.close();
      });
    });
  });
});