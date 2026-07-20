import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('drain event timing', () => {
  const testFile = path.join(__dirname, 'test-drain-timing.dirty');
  let db: any;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should emit drain only when all writes are completed', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      let drainEmitted = false;
      let writeCompleted = false;

      db.set('key1', 'value1', () => {
        writeCompleted = true;
        // In the original code, drain should not be emitted yet
        // because we still have inFlightWrites > 0
        if (drainEmitted) {
          done(new Error('Drain was emitted prematurely while writes were still in flight'));
        }
      });

      db.set('key2', 'value2', () => {
        // Both writes should be completed now
        if (!writeCompleted) {
          done(new Error('First write callback not called before second'));
        }
      });

      db.on('drain', () => {
        drainEmitted = true;
        // In the original code, drain should only be emitted after all writes complete
        // In the mutated code, drain would be emitted while writes are still in flight
        if (!writeCompleted) {
          done(new Error('Drain emitted before all writes completed'));
        } else {
          done();
        }
      });
    });
  });
});