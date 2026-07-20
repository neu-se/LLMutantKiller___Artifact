import { tmpdir } from 'os';
import { join } from 'path';
import { unlinkSync, existsSync } from 'fs';
import { createWriteStream } from 'fs';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty _flush with backpressure', () => {
  it('should write all keys even when write stream signals backpressure', (done) => {
    const dbPath = join(tmpdir(), `dirty-backpressure-${process.pid}.db`);
    if (existsSync(dbPath)) unlinkSync(dbPath);

    const db = new Dirty(dbPath);
    const results: string[] = [];

    db.on('load', () => {
      // Force backpressure by using a very large value that exceeds highWaterMark
      // Default highWaterMark for file streams is 16KB
      const largeValue = 'x'.repeat(32 * 1024); // 32KB - exceeds 16KB highWaterMark

      db.set('a', largeValue, (_err: unknown) => { results.push('a'); });
      db.set('b', largeValue, (_err: unknown) => { results.push('b'); });
      db.set('c', largeValue, (_err: unknown) => { results.push('c'); });

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
      }, 5000);
    });

    db.on('error', (err: Error) => done(err));
  }, 15000);
});