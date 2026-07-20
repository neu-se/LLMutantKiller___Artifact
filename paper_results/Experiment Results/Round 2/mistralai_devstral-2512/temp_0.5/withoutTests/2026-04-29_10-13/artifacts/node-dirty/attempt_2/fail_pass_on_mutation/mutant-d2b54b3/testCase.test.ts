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

  it('should emit drain event when write stream drains with no in-flight writes', (done) => {
    const dirty = new Dirty(dbPath);
    let drainCount = 0;

    dirty.on('load', () => {
      dirty.on('drain', () => {
        drainCount++;
      });

      // Write enough data to trigger drain
      for (let i = 0; i < 10; i++) {
        dirty.set(`key${i}`, { value: 'x'.repeat(1000) });
      }

      // Wait for operations to complete
      setTimeout(() => {
        expect(drainCount).toBeGreaterThan(0);
        dirty.close();
        done();
      }, 200);
    });
  });
});