import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('drain event after write stream backpressure', () => {
  it('emits drain when write stream drains with empty queue and zero in-flight writes', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-bp-'));
    const file = path.join(tmpDir, 'test.dirty');
    const db = new Dirty(file);
    let timer: ReturnType<typeof setTimeout>;

    const cleanup = (err?: Error) => {
      clearTimeout(timer);
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
      done(err);
    };

    db.on('load', () => {
      const ws = (db as any)._writeStream;
      const originalWrite = ws.write.bind(ws);

      ws.write = function(data: any, cb: any) {
        const wrappedCb = (err: any) => {
          cb(err);
          setImmediate(() => {
            ws.emit('drain');
          });
        };
        originalWrite(data, wrappedCb);
        return false;
      };

      db.once('drain', () => {
        cleanup();
      });

      db.set('key', 'value');
    });

    timer = setTimeout(() => {
      cleanup(new Error('Timed out - drain event not emitted'));
    }, 4000);
  });
});