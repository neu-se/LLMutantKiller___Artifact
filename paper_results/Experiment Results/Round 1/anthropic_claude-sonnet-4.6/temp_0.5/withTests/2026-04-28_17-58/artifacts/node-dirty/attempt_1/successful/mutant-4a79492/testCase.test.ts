import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('drain event fires only after all queued writes are flushed', () => {
  it('should write all keys to disk before emitting drain when write stream experiences backpressure', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-mutant-test-${Date.now()}.dirty`);

    const db = new Dirty(file);

    db.on('load', () => {
      // Write many large records to force backpressure on the write stream
      const totalKeys = 500;
      const largeValue = 'x'.repeat(10000); // 10KB per record

      for (let i = 0; i < totalKeys; i++) {
        db.set(`key${i}`, largeValue);
      }

      db.on('drain', () => {
        // When drain fires, ALL keys should be persisted to disk
        try {
          const contents = fs.readFileSync(file, 'utf-8');
          const lines = contents.trim().split('\n').filter(l => l.length > 0);

          // All keys should have been written
          expect(lines.length).toBe(totalKeys);

          // Verify all keys are present
          const writtenKeys = new Set(lines.map(line => JSON.parse(line).key));
          for (let i = 0; i < totalKeys; i++) {
            expect(writtenKeys.has(`key${i}`)).toBe(true);
          }

          // Cleanup
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