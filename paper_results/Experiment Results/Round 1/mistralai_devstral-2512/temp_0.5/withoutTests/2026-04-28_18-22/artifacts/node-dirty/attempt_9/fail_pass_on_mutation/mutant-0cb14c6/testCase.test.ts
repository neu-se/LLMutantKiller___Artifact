import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database drain event with precise write tracking', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    rimraf.sync(testDir);
  });

  it('should emit drain when inFlightWrites reaches exactly zero', (done) => {
    const db = new Dirty(dbPath);
    let drainEmitted = false;
    let writeCompleted = false;

    db.on('load', () => {
      db.on('drain', () => {
        if (!writeCompleted) {
          drainEmitted = true;
        }
      });

      db.set('key1', { value: 'test1' }, () => {
        writeCompleted = true;
        // After write completes, verify drain was emitted
        setImmediate(() => {
          expect(drainEmitted).toBe(true);
          done();
        });
      });
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});