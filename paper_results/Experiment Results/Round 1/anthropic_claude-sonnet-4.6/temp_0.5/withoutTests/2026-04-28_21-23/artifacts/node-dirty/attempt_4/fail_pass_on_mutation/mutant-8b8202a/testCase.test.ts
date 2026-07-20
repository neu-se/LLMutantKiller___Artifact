import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event', () => {
  it('should persist all data to disk before close completes even under backpressure', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);
    const total = 200;

    db.on('load', () => {
      // Write many large entries to trigger backpressure
      for (let i = 0; i < total; i++) {
        db.set(`key${i}`, { data: 'x'.repeat(5000), index: i });
      }

      // Close immediately - should wait until all writes complete
      db.close();

      db.on('write_close', () => {
        // After close, read the file and count entries
        try {
          const content = fs.readFileSync(dbPath, 'utf-8');
          const lines = content.trim().split('\n').filter(l => l.length > 0);
          const keys = new Set(lines.map(l => JSON.parse(l).key));

          try {
            // All keys should be persisted
            expect(keys.size).toBe(total);
            try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
            done();
          } catch (e) {
            try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
            done(e);
          }
        } catch (e) {
          try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
          done(e);
        }
      });
    });

    db.on('error', (err: Error) => {
      try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
      done(err);
    });
  }, 15000);
});