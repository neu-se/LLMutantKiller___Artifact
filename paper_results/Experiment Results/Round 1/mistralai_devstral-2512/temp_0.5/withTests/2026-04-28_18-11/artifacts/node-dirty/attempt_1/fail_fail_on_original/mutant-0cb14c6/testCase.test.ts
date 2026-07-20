import { Dirty } from "../../../../../../../../../../../lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('drain event emission on write completion', () => {
  const testDir = path.join(__dirname, 'tmp');
  const dbPath = path.join(testDir, 'test.dirty');

  beforeAll(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    rimraf.sync(testDir);
  });

  afterEach(() => {
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
    }
  });

  it('should emit drain event when all writes complete', (done) => {
    const db = new Dirty(dbPath);
    let drainCount = 0;

    db.on('load', () => {
      // Set multiple values to ensure multiple write operations
      db.set('key1', 'value1');
      db.set('key2', 'value2');
      db.set('key3', 'value3');

      db.on('drain', () => {
        drainCount++;
        // In the original code, drain should be emitted once when all writes complete
        // In the mutated code, drain might not be emitted correctly
        if (drainCount === 1) {
          // Verify all values were written
          expect(db.get('key1')).toBe('value1');
          expect(db.get('key2')).toBe('value2');
          expect(db.get('key3')).toBe('value3');
          done();
        }
      });
    });
  });
});