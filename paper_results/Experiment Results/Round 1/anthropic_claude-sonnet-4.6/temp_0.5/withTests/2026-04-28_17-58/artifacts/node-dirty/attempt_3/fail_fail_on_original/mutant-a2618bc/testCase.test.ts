import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { EventEmitter } from 'events';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty _flush backpressure break', () => {
  it('stops processing queue when backpressure is detected', (done) => {
    // Create a mock write stream that returns false for first write, true for second
    const mockStream = new EventEmitter() as any;
    let writeCount = 0;
    const writtenData: string[] = [];
    const writeCallbacks: Array<(err: null) => void> = [];
    
    mockStream.cork = () => {};
    mockStream.uncork = () => {};
    mockStream.write = (data: string, cb: (err: null) => void) => {
      writeCount++;
      writtenData.push(data);
      writeCallbacks.push(cb);
      // Return false for first write (backpressure), true for subsequent
      return writeCount > 1;
    };
    mockStream.end = (cb: () => void) => { if (cb) cb(); };
    mockStream.destroy = () => {};
    
    // Mock fs.createWriteStream to return our mock stream
    const originalCreateWriteStream = fs.createWriteStream;
    const originalCreateReadStream = fs.createReadStream;
    
    // Mock read stream that immediately emits 'end' and 'close'
    const mockReadStream = new EventEmitter() as any;
    mockReadStream.destroy = () => {};
    
    jest.spyOn(fs, 'createWriteStream').mockReturnValue(mockStream as any);
    jest.spyOn(fs, 'createReadStream').mockReturnValue(mockReadStream as any);
    
    const db = new Dirty('/fake/path');
    
    // Emit load event from mock read stream
    process.nextTick(() => {
      mockReadStream.emit('end');
      mockReadStream.emit('close');
    });
    
    db.on('load', () => {
      // Write A and B
      db.set('keyA', 'valueA');
      db.set('keyB', 'valueB');
      
      // After the synchronous flush, check the state
      // In original: only keyA was written (break after first write returned false)
      //   _waitForDrain=true, queue={keyB}
      // In mutation: both keyA and keyB were written (no break)
      //   _waitForDrain=false (second write returned true), queue={}
      
      // Now set keyC - in original it's queued (waitForDrain=true)
      //   in mutation it's flushed immediately (waitForDrain=false)
      let cFlushedImmediately = false;
      db.set('keyC', 'valueC', () => {
        cFlushedImmediately = true;
      });
      
      // In original: keyC is in queue, not yet written (waitForDrain=true)
      // In mutation: keyC is written immediately (waitForDrain=false)
      // We can check by seeing if keyC's write was initiated
      
      // Check how many writes happened synchronously
      const writesAfterSetC = writeCount;
      
      // In original: 1 write (only keyA)
      // In mutation: 3 writes (keyA, keyB, keyC)
      
      jest.restoreAllMocks();
      
      if (writesAfterSetC === 1) {
        // Original behavior
        expect(writesAfterSetC).toBe(1); // Only keyA written
        done();
      } else if (writesAfterSetC === 3) {
        // Mutation behavior - this should fail the test
        expect(writesAfterSetC).toBe(1); // This will fail
        done();
      } else {
        done(new Error(`Unexpected write count: ${writesAfterSetC}`));
      }
    });
  });
});