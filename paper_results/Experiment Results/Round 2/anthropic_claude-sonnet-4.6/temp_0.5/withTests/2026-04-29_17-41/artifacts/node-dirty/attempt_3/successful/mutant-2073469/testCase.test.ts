import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('drain event via write stream backpressure path', () => {
  it('should emit drain when write stream drains after backpressure with empty queue', (done) => {
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const file = path.join(os.tmpdir(), `test-bp-${process.pid}.dirty`);
    
    try { fs.unlinkSync(file); } catch (e) {}
    
    const db = new Dirty(file);
    
    db.on('load', () => {
      // After the set completes (drain fires normally), manually simulate
      // the backpressure scenario by directly triggering the write stream drain
      // with _waitForDrain=true and empty queue
      
      db.set('key1', 'value1', () => {
        // Now simulate: _waitForDrain was true, queue is empty, inFlightWrites=0
        // Force _waitForDrain to true and emit drain on write stream
        db._waitForDrain = true;
        db._queue.clear();
        db._inFlightWrites = 0;
        
        db.once('drain', () => {
          try { fs.unlinkSync(file); } catch (e) {}
          done();
        });
        
        // Trigger the write stream drain event - this should go through the backpressure path
        db._writeStream.emit('drain');
      });
    });
    
    db.on('error', done);
  }, 5000);
});