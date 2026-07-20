import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close() with pending queue items', () => {
  it('should process all queued writes before closing when close is called before drain', (done) => {
    const file = path.join(os.tmpdir(), `dirty-queue-${process.pid}.dirty`);
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    // Use a large number of writes to ensure queue has items when close is called
    const db = new Dirty(file);

    db.on('load', () => {
      // Write enough data to potentially cause backpressure
      // so _waitForDrain=true and queue still has items
      const bigVal = 'x'.repeat(1024 * 64);
      for (let i = 0; i < 20; i++) {
        db.set(`key${i}`, bigVal);
      }

      // Now close - queue may still have items (if backpressure occurred)
      // OR queue is empty but _inFlightWrites > 0
      // In either case, all data should be written before write_close
      db.close();
    });

    db.on('write_close', () => {
      const contents = fs.readFileSync(file, 'utf-8');
      try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
      const lines = contents.trim().split('\n').filter(l => l.length > 0);
      // All 20 writes should be persisted
      expect(lines.length).toBe(20);
      done();
    });
  });
});