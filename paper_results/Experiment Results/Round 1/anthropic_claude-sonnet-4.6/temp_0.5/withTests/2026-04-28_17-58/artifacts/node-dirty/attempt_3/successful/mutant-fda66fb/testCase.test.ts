import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty write stream drain with backpressure', () => {
  it('should persist all set values to disk before emitting drain when backpressure occurs', (done) => {
    const file = path.join(os.tmpdir(), `dirty-drain-mutation-${process.pid}.dirty`);
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);
    const totalWrites = 80;
    // Large value to encourage backpressure on the write stream
    const bigVal = 'a'.repeat(65536);

    db.on('load', () => {
      for (let i = 0; i < totalWrites; i++) {
        db.set(`key${i}`, bigVal);
      }

      db.once('drain', () => {
        // On original code: drain fires only after all writes are flushed to disk
        // On mutated code: drain fires prematurely while queue still has items
        // Verify all keys are persisted by reading the file
        const contents = fs.readFileSync(file, 'utf-8');
        const lines = contents.trim().split('\n').filter(Boolean);
        expect(lines.length).toBe(totalWrites);
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        done();
      });
    });
  });
});