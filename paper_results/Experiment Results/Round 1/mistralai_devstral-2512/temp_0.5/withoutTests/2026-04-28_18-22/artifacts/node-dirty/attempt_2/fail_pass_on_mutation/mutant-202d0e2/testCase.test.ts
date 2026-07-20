import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database drain event after multiple writes', () => {
  const testDbPath = path.join(__dirname, 'test-db-multiple.txt');
  const dirty = new Dirty(testDbPath);

  beforeAll((done) => {
    dirty.on('load', () => {
      done();
    });
  });

  afterAll((done) => {
    dirty.close();
    rimraf(testDbPath, done);
  });

  it('should emit drain event after multiple writes complete', (done) => {
    const testKey1 = 'test-key-1';
    const testKey2 = 'test-key-2';
    const testValue1 = { data: 'test1' };
    const testValue2 = { data: 'test2' };

    let drainCount = 0;
    dirty.on('drain', () => {
      drainCount++;
      if (drainCount === 1) {
        // First drain should occur after first write
        // Now trigger another write to test the flush behavior
        dirty.set(testKey2, testValue2, () => {
          // This callback should fire, but drain shouldn't emit again
          // until the write stream actually drains
        });
      } else if (drainCount === 2) {
        // Second drain should occur after second write completes
        done();
      }
    });

    // First write
    dirty.set(testKey1, testValue1, () => {
      // Callback fires but drain should only emit once per flush cycle
    });
  });
});