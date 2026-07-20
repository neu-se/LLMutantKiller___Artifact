import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty _flush backpressure mutation', () => {
  it('should persist all written keys to disk correctly', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const cleanup = (err?: unknown) => {
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}
      if (err) done(err); else done();
    };

    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Write a batch of keys, then on drain verify file integrity
      const numKeys = 10;
      let drainFired = false;

      db.once('drain', () => {
        drainFired = true;
        try {
          // Read the file and verify no duplicate entries exist
          const content = fs.readFileSync(dbPath, 'utf-8');
          const lines = content.trim().split('\n').filter(l => l.length > 0);
          
          // Parse all rows and check for duplicates
          const seenKeys = new Map<string, number>();
          for (const line of lines) {
            const row = JSON.parse(line);
            seenKeys.set(row.key, (seenKeys.get(row.key) || 0) + 1);
          }
          
          // With the mutation, backpressure is ignored so keys might be written
          // multiple times, OR some keys might be missing
          expect(lines.length).toBe(numKeys);
          
          for (let i = 0; i < numKeys; i++) {
            expect(seenKeys.get(`key${i}`)).toBe(1);
          }
          
          cleanup();
        } catch (e) {
          cleanup(e);
        }
      });

      for (let i = 0; i < numKeys; i++) {
        db.set(`key${i}`, `value${i}`);
      }
    });

    db.on('error', cleanup);
  }, 10000);
});