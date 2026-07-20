import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database drain event verification', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    rimraf.sync(testDir);
  });

  it('should emit drain event with correct event name when writes complete', (done) => {
    const db = new Dirty(dbPath);
    let drainCount = 0;
    let emptyEventCount = 0;

    db.on('load', () => {
      // Write data to trigger the drain event
      db.set('testKey', { test: 'data' }, () => {
        // This callback should be triggered
      });
    });

    // Track both possible events
    const originalEmit = db.emit;
    db.emit = function(event: string, ...args: any[]) {
      if (event === 'drain') drainCount++;
      if (event === '') emptyEventCount++;
      return originalEmit.call(this, event, ...args);
    };

    setTimeout(() => {
      try {
        expect(drainCount).toBeGreaterThan(0);
        expect(emptyEventCount).toBe(0);
        db.close();
        done();
      } catch (error) {
        done(error);
      }
    }, 200);
  });
});