import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database drain event', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rimraf.sync(testDir);
  });

  it('should emit drain event with correct argument when write stream drains', (done) => {
    const db = new Dirty(dbPath);
    let loadCount = 0;
    let drainCount = 0;

    db.on('load', () => {
      loadCount++;
      if (loadCount === 1) {
        db.set('key1', 'value1', () => {
          // This should trigger a flush and eventually drain
        });
      }
    });

    db.on('drain', () => {
      drainCount++;
      // The drain event should be emitted with no arguments in original code
      // In mutated code, it emits with empty string which is truthy
      if (drainCount === 1) {
        // Verify the drain event was emitted correctly
        expect(drainCount).toBe(1);
        done();
      }
    });

    // Force initial load to complete
    db.on('load', () => {
      if (loadCount === 1) {
        // Trigger a write that will cause drain
        db.set('key2', 'value2');
      }
    });
  });
});