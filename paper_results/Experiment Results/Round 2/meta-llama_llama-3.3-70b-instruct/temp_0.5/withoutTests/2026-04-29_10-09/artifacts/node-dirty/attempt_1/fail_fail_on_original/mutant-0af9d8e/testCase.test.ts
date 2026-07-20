import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should not emit drain when there are in-flight writes', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);
    let drainCalled = false;

    dirty.on('drain', () => {
      drainCalled = true;
    });

    dirty.set('key', 'value', () => {
      // Simulate in-flight writes
      dirty._inFlightWrites = 1;
      dirty._writeStream.emit('drain');

      // Check if drain was emitted
      setTimeout(() => {
        expect(drainCalled).toBe(false);
        rimraf.sync(dbPath);
        done();
      }, 10);
    });
  });
});