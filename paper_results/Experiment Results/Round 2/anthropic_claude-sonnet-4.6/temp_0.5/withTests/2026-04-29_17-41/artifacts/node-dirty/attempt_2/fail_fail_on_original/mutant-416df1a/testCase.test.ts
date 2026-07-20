import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('error emission on write failure without callback', () => {
  it('emits error when write fails and no callback was provided for the key', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-test-${Date.now()}.dirty`);
    
    // Clean up any existing file
    try { fs.unlinkSync(tmpFile); } catch (e) { /* ignore */ }
    
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(tmpFile);
    
    db.on('load', () => {
      // Destroy the write stream to cause write errors
      db._writeStream.destroy(new Error('simulated write error'));
      
      db.on('error', (err: Error) => {
        expect(err).toBeTruthy();
        try { fs.unlinkSync(tmpFile); } catch (e) { /* ignore */ }
        done();
      });
      
      // Set without a callback → cbs.length === 0
      // Original: emits error (because !cbs.length && err != null)
      // Mutated: does NOT emit error (because cbs.length is 0, condition is false)
      db.set('key', 'value');
    });
    
    setTimeout(() => {
      try { fs.unlinkSync(tmpFile); } catch (e) { /* ignore */ }
      done(new Error('error event not emitted within timeout'));
    }, 3000);
  });
});