import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event with backpressure', () => {
  it('should emit drain event when write stream causes backpressure and queue becomes empty', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-bp-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    db.on('load', () => {
      let drainCount = 0;

      db.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          // After first drain, write a large batch to force backpressure
          // Write many large records to exhaust the write stream buffer
          const largeValue = 'x'.repeat(64 * 1024); // 64KB per record
          for (let i = 0; i < 20; i++) {
            db.set(`key${i}`, { data: largeValue });
          }
        } else if (drainCount === 2) {
          // Second drain should come after backpressure is resolved
          // This is the drain that the mutation prevents
          try {
            db.close();
          } catch (e) {
            // ignore
          }
          try {
            fs.rmSync(tmpDir, { recursive: true });
          } catch (e) {
            // ignore
          }
          done();
        }
      });

      db.on('error', (err: Error) => {
        done(err);
      });

      // Trigger first write to get first drain
      db.set('initial', { value: 'start' });
    });

    db.on('error', (err: Error) => {
      done(err);
    });
  }, 10000);
});