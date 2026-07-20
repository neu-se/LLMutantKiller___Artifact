import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty close() calls destroy on write stream in end callback', () => {
  it('should call destroy() on writeStream inside the end() callback', (done) => {
    const file = path.join(os.tmpdir(), `dirty-spy-${process.pid}.dirty`);
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    jest.resetModules();
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(file);

    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        const ws = db._writeStream;
        let destroyCalledInEndCallback = false;
        let insideEndCallback = false;

        const originalEnd = ws.end.bind(ws);
        ws.end = function(cb: any) {
          return originalEnd(() => {
            insideEndCallback = true;
            if (cb) cb();
            insideEndCallback = false;
          });
        };

        const originalDestroy = ws.destroy.bind(ws);
        ws.destroy = jest.fn(function(...args: any[]) {
          if (insideEndCallback) {
            destroyCalledInEndCallback = true;
          }
          return originalDestroy(...args);
        });

        db.on('write_close', () => {
          try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
          expect(destroyCalledInEndCallback).toBe(true);
          done();
        });

        db.close();
      });
    });
  });
});