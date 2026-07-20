import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { EventEmitter } from 'events';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('Dirty drain event after write stream drain', () => {
  it('should emit drain when stream drain fires with empty queue and inFlightWrites at 0', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Replace the write stream with a mock that controls backpressure
      const mockStream = new EventEmitter() as any;
      mockStream.cork = () => {};
      mockStream.uncork = () => {};
      mockStream.end = (cb: any) => { if (cb) cb(); };
      mockStream.destroy = () => {};
      
      let writeCallbacks: Array<(err?: any) => void> = [];
      let returnFalse = true;
      
      mockStream.write = function(data: any, cb: any) {
        writeCallbacks.push(cb);
        if (returnFalse) {
          returnFalse = false;
          return false; // Backpressure
        }
        return true;
      };
      
      (db as any)._writeStream = mockStream;
      
      db.once('drain', () => {
        expect(db.get('key1')).toBe('value1');
        try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) { /* ignore */ }
        done();
      });
      
      db.set('key1', 'value1');
      
      // Simulate write completing (callback fires) while _waitForDrain is still true
      // At this point: _inFlightWrites goes to 0, but _waitForDrain=true so no drain emit
      setImmediate(() => {
        const cb = writeCallbacks.shift();
        if (cb) cb(); // _inFlightWrites becomes 0, _waitForDrain still true
        
        // Now simulate stream drain event
        // _waitForDrain=false, queue empty, _inFlightWrites=0
        // Original: emits drain; Mutant: doesn't
        setImmediate(() => {
          mockStream.emit('drain');
        });
      });
    });

    db.on('error', (err: Error) => {
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) { /* ignore */ }
      done(err);
    });
  }, 10000);
});