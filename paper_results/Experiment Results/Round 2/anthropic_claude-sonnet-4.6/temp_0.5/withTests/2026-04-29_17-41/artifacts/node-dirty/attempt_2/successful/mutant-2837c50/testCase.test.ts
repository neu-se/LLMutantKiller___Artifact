import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('close() retries after drain when writes are pending', () => {
  it('should fire write_close event when close() is called before writes complete', (done) => {
    const file = path.join(os.tmpdir(), `dirty-test-close-${process.pid}-${Date.now()}.dirty`);

    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);

    db.on('load', () => {
      // Queue multiple writes
      db.set('key1', 'value1');
      db.set('key2', 'value2');
      db.set('key3', 'value3');

      // Call close() immediately while writes may still be pending in the queue
      // Original: registers once('drain', () => this.close()) so close retries
      // Mutated: registers once('drain', () => undefined) so close never retries
      db.close();
    });

    db.on('write_close', () => {
      try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
      done();
    });
  }, 5000);
});