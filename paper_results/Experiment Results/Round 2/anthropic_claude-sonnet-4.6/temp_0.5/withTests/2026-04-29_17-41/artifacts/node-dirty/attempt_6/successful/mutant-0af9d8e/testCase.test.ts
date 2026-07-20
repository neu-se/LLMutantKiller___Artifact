import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { EventEmitter } from 'events';
// @ts-ignore
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('drain event via write stream drain handler', () => {
  it('should emit drain when stream drain fires with empty queue and _inFlightWrites is 0', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-drain-test-'));
    const file = path.join(tmpDir, 'test.dirty');

    const db = new Dirty(file);

    const timeout = setTimeout(() => {
      try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
      done(new Error('Timed out: drain event was never emitted'));
    }, 10000);

    db.on('load', () => {
      // Intercept the write stream after load to simulate backpressure
      // by making write() always return false (backpressure signal)
      // and then manually emitting 'drain' on the stream after a tick
      const ws = (db as any)._writeStream;

      const realWrite = ws.write.bind(ws);
      ws.write = function(data: any, cb: any) {
        // Call real write so data is actually written and callback fires
        realWrite(data, cb);
        // Always signal backpressure
        return false;
      };

      db.once('drain', () => {
        clearTimeout(timeout);
        try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
        done();
      });

      db.set('key1', 'value1');

      // After write callback has had time to fire (decrementing _inFlightWrites to 0),
      // emit 'drain' on the write stream to trigger the stream drain handler
      setTimeout(() => {
        ws.emit('drain');
      }, 500);
    });

    db.on('error', (err: Error) => {
      clearTimeout(timeout);
      try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
      done(err);
    });
  }, 10000);
});