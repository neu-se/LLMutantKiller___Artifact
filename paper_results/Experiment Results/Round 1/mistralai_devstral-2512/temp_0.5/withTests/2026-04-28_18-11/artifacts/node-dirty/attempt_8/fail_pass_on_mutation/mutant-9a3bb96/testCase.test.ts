import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('close method with pending operations', () => {
  const testFile = path.join(__dirname, 'test-close-pending.dirty');
  let db: any;

  beforeEach(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  afterEach(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  it('should emit drain event before closing when there are pending operations', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Create pending operations
      db.set('key1', 'value1');
      db.set('key2', 'value2');

      let drainEmitted = false;
      let writeCloseEmitted = false;

      db.on('drain', () => {
        drainEmitted = true;
      });

      db.on('write_close', () => {
        writeCloseEmitted = true;
      });

      // Call close immediately
      db.close();

      // In original code: drain should fire before write_close
      // In mutated code: close happens immediately without waiting for drain
      setTimeout(() => {
        if (writeCloseEmitted && !drainEmitted) {
          // Mutation detected - write_close fired without drain
          fail('write_close emitted before drain - mutation detected');
        } else if (drainEmitted && writeCloseEmitted) {
          // Original behavior - proper ordering
          done();
        } else {
          // Timeout case
          fail('Test timed out - neither drain nor write_close emitted');
        }
      }, 100);
    });
  });
});