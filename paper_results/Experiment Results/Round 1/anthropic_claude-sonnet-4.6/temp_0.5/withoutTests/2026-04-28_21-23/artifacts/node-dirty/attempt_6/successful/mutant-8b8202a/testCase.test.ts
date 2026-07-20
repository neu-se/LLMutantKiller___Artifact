import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event', () => {
  it('should emit drain exactly once per batch of sets when no path backpressure occurs', (done) => {
    // Use in-memory db (no path) to establish baseline drain=1 behavior,
    // then use file db to test backpressure scenario
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    const db = new Dirty(dbPath);

    db.on('load', () => {
      const drainEvents: number[] = [];
      let phase = 0;

      db.on('drain', () => {
        drainEvents.push(phase);
      });

      // Phase 1: write a batch, wait for drain, record count
      phase = 1;
      const total = 80;
      let cbs = 0;

      for (let i = 0; i < total; i++) {
        db.set(`key${i}`, { data: 'x'.repeat(4000), index: i }, () => {
          cbs++;
        });
      }

      // Wait long enough for all writes + drains to settle
      setTimeout(() => {
        try {
          const phase1Drains = drainEvents.filter(p => p === 1).length;
          // Original: drain fires once after all writes complete
          // Mutated: drain fires extra times due to premature emission during backpressure
          // The drain should fire exactly once for this batch
          expect(phase1Drains).toBe(1);
          db.close();
          db.on('write_close', () => {
            try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
            done();
          });
        } catch (e) {
          try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
          done(e);
        }
      }, 2000);
    });

    db.on('error', (err: Error) => {
      try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
      done(err);
    });
  }, 15000);
});