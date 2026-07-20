import * as path from 'path';
import * as fs from 'fs';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close with pending writes in queue', () => {
  it('should complete close and emit write_close even when called with pending writes', (done) => {
    const tmpDir = path.join(__dirname, 'tmp_close_test_jest');
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }
    const file = path.join(tmpDir, `close_test_${process.pid}.dirty`);

    const db = new Dirty(file);

    db.on('load', () => {
      // Set values to populate the queue
      db.set('key1', 'value1');
      db.set('key2', 'value2');
      // Call close immediately while queue still has pending writes
      // Original: listens for 'drain' then calls close() again -> write_close fires
      // Mutated: listens for '' event which never fires -> write_close never fires
      db.close();
    });

    db.on('write_close', () => {
      try {
        fs.unlinkSync(file);
        fs.rmdirSync(tmpDir, { recursive: true });
      } catch (e) { /* ignore */ }
      done();
    });
  }, 5000);
});