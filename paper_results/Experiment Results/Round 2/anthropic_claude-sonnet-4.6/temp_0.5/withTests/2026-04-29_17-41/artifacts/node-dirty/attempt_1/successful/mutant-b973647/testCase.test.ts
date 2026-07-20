import { EventEmitter } from 'events';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('Dirty error event on file read error', () => {
  it('should emit "error" event (not empty string event) when a non-ENOENT read stream error occurs', (done) => {
    // Create a temp file
    const tmpDir = os.tmpdir();
    const tmpFile = path.join(tmpDir, `dirty-test-${Date.now()}.dirty`);
    
    // Write some valid data to the file first
    fs.writeFileSync(tmpFile, '{"key":"foo","val":"bar"}\n', 'utf-8');
    
    const db = new Dirty(tmpFile);
    
    // We need to simulate a non-ENOENT error on the read stream.
    // We'll listen for the 'load' event first, then test by creating a new db
    // with a file that will cause an error.
    
    // Instead, let's directly test by intercepting the error event.
    // The mutation changes emit('error', err) to emit('', err).
    // So we listen for 'error' event - original fires it, mutant doesn't.
    
    let errorEventFired = false;
    let emptyEventFired = false;
    
    db.on('error', (err: Error) => {
      errorEventFired = true;
    });
    
    db.on('', (err: Error) => {
      emptyEventFired = true;
    });
    
    db.on('load', () => {
      // Now simulate a read stream error by creating a new db instance
      // and manually triggering an error on its read stream
      const db2 = new Dirty(tmpFile);
      
      let errorCaught = false;
      let emptyCaught = false;
      
      db2.on('error', (err: Error) => {
        errorCaught = true;
      });
      
      db2.on('', (err: Error) => {
        emptyCaught = true;
      });
      
      db2.on('load', () => {
        // Simulate a non-ENOENT error on the read stream
        // by emitting an error directly on the read stream
        if (db2._readStream) {
          const fakeError = new Error('Simulated read error');
          (fakeError as any).code = 'EIO'; // Not ENOENT
          db2._readStream.emit('error', fakeError);
          
          // Give time for event propagation
          setImmediate(() => {
            // In original: errorCaught should be true, emptyCaught false
            // In mutant: errorCaught should be false, emptyCaught true
            expect(errorCaught).toBe(true);
            
            // Cleanup
            try { fs.unlinkSync(tmpFile); } catch (e) { /* ignore */ }
            done();
          });
        } else {
          // Read stream already closed, test differently
          // Create a scenario where we can trigger the error path
          try { fs.unlinkSync(tmpFile); } catch (e) { /* ignore */ }
          
          // Create a new file and immediately cause an error
          const tmpFile2 = path.join(tmpDir, `dirty-test2-${Date.now()}.dirty`);
          fs.writeFileSync(tmpFile2, '{"key":"a","val":"b"}\n', 'utf-8');
          
          const db3 = new Dirty(tmpFile2);
          let error3Caught = false;
          
          db3.on('error', () => { error3Caught = true; });
          
          // Emit error on read stream before it closes
          if (db3._readStream) {
            const fakeError2 = new Error('Simulated error');
            (fakeError2 as any).code = 'EIO';
            db3._readStream.emit('error', fakeError2);
          }
          
          setImmediate(() => {
            expect(error3Caught).toBe(true);
            try { fs.unlinkSync(tmpFile2); } catch (e) { /* ignore */ }
            done();
          });
        }
      });
    });
    
    // Handle uncaught errors from db
    db.on('error', () => {});
  });
});