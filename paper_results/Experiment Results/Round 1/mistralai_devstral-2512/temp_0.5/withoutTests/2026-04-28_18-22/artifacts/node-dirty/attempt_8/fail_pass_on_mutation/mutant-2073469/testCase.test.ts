import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database drain event emission', () => {
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
    let drainReceived = false;
    let emptyEventReceived = false;

    db.on('load', () => {
      // Write enough data to trigger multiple flushes
      for (let i = 0; i < 5; i++) {
        db.set(`key${i}`, { value: `data${i}` });
      }
    });

    // Track all emitted events
    const originalEmit = db.emit;
    db.emit = function(event: string, ...args: any[]) {
      if (event === 'drain') drainReceived = true;
      if (event === '') emptyEventReceived = true;
      return originalEmit.call(this, event, ...args);
    };

    setTimeout(() => {
      try {
        expect(drainReceived).toBe(true);
        expect(emptyEventReceived).toBe(false);
        db.close();
        done();
      } catch (error) {
        done(error);
      }
    }, 300);
  });
});