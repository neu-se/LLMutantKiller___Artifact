import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close() with pending writes', () => {
  it('should wait for pending writes to drain before closing the write stream', (done) => {
    const file = path.join(os.tmpdir(), `dirty-pending-close-${process.pid}.dirty`);

    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);

    db.on('load', () => {
      // Set multiple keys to ensure there are pending writes in the queue
      db.set('alpha', 'one');
      db.set('beta', 'two');
      db.set('gamma', 'three');

      // Immediately call close() before drain fires - pending writes exist
      // Original: registers once('drain', close) and returns, so writes complete first
      // Mutated: falls through and closes stream immediately, losing pending writes
      db.close();

      db.on('write_close', () => {
        try {
          const contents = fs.readFileSync(file, 'utf-8');
          const lines = contents.trim().split('\n').filter((l: string) => l.length > 0);
          const records = lines.map((l: string) => JSON.parse(l));
          const writtenKeys = records.map((r: any) => r.key);

          // All three keys must have been persisted before the stream closed
          expect(writtenKeys).toContain('alpha');
          expect(writtenKeys).toContain('beta');
          expect(writtenKeys).toContain('gamma');

          try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
          done();
        } catch (err) {
          try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
          done(err);
        }
      });
    });
  });
});