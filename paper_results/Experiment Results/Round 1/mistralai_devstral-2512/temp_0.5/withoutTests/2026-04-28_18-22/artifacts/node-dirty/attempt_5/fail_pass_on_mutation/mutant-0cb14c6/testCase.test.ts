import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database drain event with precise timing', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    rimraf.sync(testDir);
  });

  it('should emit drain when inFlightWrites becomes exactly zero', (done) => {
    const db = new Dirty(dbPath);
    let drainEmitted = false;
    let writeCompleted = false;

    db.on('load', () => {
      db.on('drain', () => {
        drainEmitted = true;
        if (writeCompleted) {
          expect(drainEmitted).toBe(true);
          done();
        }
      });

      db.set('key1', { value: 'test1' }, () => {
        writeCompleted = true;
        if (drainEmitted) {
          expect(drainEmitted).toBe(true);
          done();
        }
      });
    });

    db.on('error', (err) => {
      done(err);
    });

    // Fail test if not completed within reasonable time
    setTimeout(() => {
      if (!drainEmitted || !writeCompleted) {
        done(new Error('Test timed out - drain event not emitted correctly'));
      }
    }, 500);
  });
});