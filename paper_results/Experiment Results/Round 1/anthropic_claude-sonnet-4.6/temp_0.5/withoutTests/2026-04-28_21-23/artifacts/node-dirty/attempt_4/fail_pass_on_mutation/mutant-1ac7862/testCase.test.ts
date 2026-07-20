import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event', () => {
  it('should emit drain only after all pending keys are written to disk', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Set multiple keys without callbacks so they all queue up
      db.set('key1', 'val1');
      db.set('key2', 'val2');
      db.set('key3', 'val3');

      db.once('drain', () => {
        // On drain, check that the file on disk contains all 3 keys
        try {
          const contents = fs.readFileSync(dbPath, 'utf-8');
          const lines = contents.trim().split('\n').filter(Boolean);
          const rows = lines.map((l: string) => JSON.parse(l));
          const keys = rows.map((r: any) => r.key);
          
          try {
            expect(keys).toContain('key1');
            expect(keys).toContain('key2');
            expect(keys).toContain('key3');
            try { fs.rmSync(tmpDir, { recursive: true }); } catch {}
            done();
          } catch (e) {
            try { fs.rmSync(tmpDir, { recursive: true }); } catch {}
            done(e);
          }
        } catch (e) {
          try { fs.rmSync(tmpDir, { recursive: true }); } catch {}
          done(e);
        }
      });
    });

    db.on('error', (err: Error) => {
      try { fs.rmSync(tmpDir, { recursive: true }); } catch {}
      done(err);
    });
  });
});