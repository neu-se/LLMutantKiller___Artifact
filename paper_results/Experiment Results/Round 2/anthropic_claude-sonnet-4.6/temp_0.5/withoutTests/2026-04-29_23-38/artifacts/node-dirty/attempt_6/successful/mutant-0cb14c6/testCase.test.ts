import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('Dirty drain event after write stream drain', () => {
  it('should emit drain when stream drains with empty queue and inFlightWrites exactly 0', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    const db = new Dirty(dbPath);

    db.on('load', () => {
      const writeStream = (db as any)._writeStream;
      
      db.once('drain', () => {
        expect(db.get('key1')).toBe('value1');
        try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) {}
        done();
      });

      // Manually set up the state: _waitForDrain=true, _inFlightWrites=1, queue empty
      (db as any)._waitForDrain = true;
      (db as any)._inFlightWrites = 1;
      // Store key in data but not in queue (queue already empty)
      (db as any)._data.set('key1', 'value1');

      // Simulate write callback completing: _inFlightWrites→0, _waitForDrain still true
      (db as any)._inFlightWrites = 0;
      
      // Now emit drain on the actual write stream
      // _waitForDrain=false (set by handler), queue empty, _inFlightWrites=0
      // Original (<=0): emits drain; Mutant (<0): doesn't
      writeStream.emit('drain');
    });

    db.on('error', (err: Error) => {
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) {}
      done(err);
    });
  }, 10000);
});