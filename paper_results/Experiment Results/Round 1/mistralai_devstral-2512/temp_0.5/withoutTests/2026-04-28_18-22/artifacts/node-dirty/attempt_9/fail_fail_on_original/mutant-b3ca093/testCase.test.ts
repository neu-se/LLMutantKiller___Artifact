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

  it('should process all queued writes when waitForDrain is true', (done) => {
    const db = new Dirty(dbPath);
    let firstWriteDone = false;
    let secondWriteDone = false;
    let drainFired = false;

    db.on('load', () => {
      // First write that will trigger drain
      db.set('key1', { value: 'x'.repeat(10000) }, (err: Error | null) => {
        firstWriteDone = true;
        if (err) {
          done(err);
          return;
        }

        // Queue another write immediately while drain is in progress
        db.set('key2', { value: 'y' }, (err: Error | null) => {
          secondWriteDone = true;
          if (err) {
            done(err);
            return;
          }
        });
      });

      db.on('drain', () => {
        drainFired = true;
        // After drain, both writes should be complete
        expect(firstWriteDone).toBe(true);
        expect(secondWriteDone).toBe(true);
        expect(drainFired).toBe(true);
        db.close();
        done();
      });
    });

    db.on('error', (err: Error) => {
      done(err);
    });

    // Safety timeout
    setTimeout(() => {
      done(new Error('Test timed out'));
    }, 5000);
  });
});