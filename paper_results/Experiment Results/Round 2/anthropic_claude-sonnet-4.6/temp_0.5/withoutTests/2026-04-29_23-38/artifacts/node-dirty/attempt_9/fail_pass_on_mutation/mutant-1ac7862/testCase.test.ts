import { tmpdir } from 'os';
import { join } from 'path';
import { unlinkSync, existsSync } from 'fs';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty _flush', () => {
  it('should call callbacks for all keys set in the same tick', (done) => {
    const dbPath = join(tmpdir(), `dirty-callbacks-${process.pid}.db`);
    if (existsSync(dbPath)) unlinkSync(dbPath);

    const db = new Dirty(dbPath);
    const results: string[] = [];

    db.on('load', () => {
      db.set('a', 1, (_err: unknown) => { results.push('a'); });
      db.set('b', 2, (_err: unknown) => { results.push('b'); });
      db.set('c', 3, (_err: unknown) => { results.push('c'); });

      // Wait sufficient time for all IO to complete
      setTimeout(() => {
        expect(results).toContain('a');
        expect(results).toContain('b');
        expect(results).toContain('c');
        expect(results).toHaveLength(3);

        db.close();
        db.on('write_close', () => {
          try { unlinkSync(dbPath); } catch (_e) {}
          done();
        });
      }, 3000);
    });

    db.on('error', (err: Error) => done(err));
  }, 10000);
});