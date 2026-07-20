import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty drain event emission', () => {
  const testDir = path.join(__dirname, 'test-dirty-drain');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    rimraf.sync(testDir);
  });

  it('should emit drain event when write stream drains and no writes are in flight', (done) => {
    const dirty = new Dirty(dbPath);
    let drainEmitted = false;

    dirty.on('load', () => {
      dirty.on('drain', () => {
        drainEmitted = true;
      });

      // Force the write stream to drain by writing data that exceeds highWaterMark
      for (let i = 0; i < 100; i++) {
        dirty.set(`key${i}`, { value: 'x'.repeat(1000) });
      }

      // Wait a bit for the drain event to be processed
      setTimeout(() => {
        expect(drainEmitted).toBe(true);
        dirty.close();
        done();
      }, 100);
    });
  });
});