import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { EventEmitter } from 'events';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty non-ENOENT error handling', () => {
  it('should emit error event (not load) when read stream fails with non-ENOENT error', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty_write_${Date.now()}_${process.pid}.dirty`);
    
    // Create a fake read stream that will emit a non-ENOENT error
    const fakeReadStream = new EventEmitter() as any;
    fakeReadStream.destroy = () => {};
    
    let readStreamCallCount = 0;
    const originalCreateReadStream = fs.createReadStream;
    
    (fs as any).createReadStream = (...args: any[]) => {
      readStreamCallCount++;
      // Restore original so nothing else is affected
      (fs as any).createReadStream = originalCreateReadStream;
      return fakeReadStream;
    };
    
    let finished = false;
    const finish = (err?: Error) => {
      if (finished) return;
      finished = true;
      (fs as any).createReadStream = originalCreateReadStream;
      try { fs.unlinkSync(tmpFile); } catch (_) {}
      done(err);
    };
    
    const db = new Dirty(tmpFile);
    
    // Emit a non-ENOENT error from the fake read stream
    process.nextTick(() => {
      const err: any = new Error('Is a directory');
      err.code = 'EISDIR';
      fakeReadStream.emit('error', err);
    });
    
    db.on('load', () => {
      // Mutated code emits 'load' for all errors - this should NOT happen
      finish(new Error('load event should not fire for non-ENOENT errors'));
    });
    
    db.on('error', (err: Error) => {
      // Original code correctly emits error for non-ENOENT errors
      finish();
    });
    
    setTimeout(() => finish(new Error('Timed out')), 3000);
  });
});