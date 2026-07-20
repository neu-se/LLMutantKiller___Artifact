import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { rimraf } from 'rimraf';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty write stream drain handling', () => {
  it('should flush remaining queue items and emit drain after write stream drain event', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    const timeout = setTimeout(() => {
      rimraf(tmpDir).catch(() => {});
      done(new Error('Test timed out - drain event was never properly handled, likely due to _waitForDrain never being reset'));
    }, 10000);

    db.on('load', () => {
      const numEntries = 5000;
      const largeValue = 'x'.repeat(1000);
      let completedCallbacks = 0;

      db.once('drain', () => {
        clearTimeout(timeout);
        expect(completedCallbacks).toBe(numEntries);
        db.close();
        rimraf(tmpDir).then(() => done()).catch(done);
      });

      for (let i = 0; i < numEntries; i++) {
        db.set(`key${i}`, { value: largeValue, index: i }, (err) => {
          if (err) return;
          completedCallbacks++;
        });
      }
    });
  });
});