import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database flush behavior', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true });
    }
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true });
    }
  });

  it('should process all queued items when waitForDrain is true', (done) => {
    const db = new Dirty(dbPath);
    let callbackCount = 0;
    const expectedCallbacks = 2;

    db.on('load', () => {
      // First write that will trigger drain
      db.set('key1', { value: 'x'.repeat(10000) }, (err: Error | null) => {
        callbackCount++;
        if (err) {
          done(err);
          return;
        }

        // Queue another write immediately while drain is in progress
        db.set('key2', { value: 'y' }, (err: Error | null) => {
          callbackCount++;
          if (err) {
            done(err);
            return;
          }

          // Both callbacks should be called
          expect(callbackCount).toBe(expectedCallbacks);
          db.close();
          done();
        });
      });
    });

    db.on('error', (err: Error) => {
      done(err);
    });

    // Safety timeout to detect if second callback never fires
    setTimeout(() => {
      if (callbackCount < expectedCallbacks) {
        done(new Error(`Only ${callbackCount} of ${expectedCallbacks} callbacks were called`));
      }
    }, 3000);
  });
});