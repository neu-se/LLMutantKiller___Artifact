import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('drain event behavior with queue size check', () => {
  const testFile = path.join(__dirname, 'test-drain-behavior.dirty');
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
    if (db) {
      db.close();
    }
  });

  it('should emit drain event when queue is empty and inFlightWrites is zero', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      let drainCount = 0;
      const drainListener = () => {
        drainCount++;
        if (drainCount === 2) {
          db.removeListener('drain', drainListener);
          done();
        }
      };

      db.on('drain', drainListener);

      // First write
      db.set('key1', 'value1', () => {
        // Second write that should trigger drain when queue is empty
        db.set('key2', 'value2', () => {
          // The drain event should fire twice:
          // 1. After first write completes
          // 2. After second write when queue is empty
        });
      });
    });
  });
});