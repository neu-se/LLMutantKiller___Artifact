import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('close method behavior with pending operations', () => {
  const testFile = path.join(__dirname, 'test-close-behavior.dirty');
  let db: any;

  beforeEach(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  afterEach(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  it('should emit drain event before closing when there are pending writes', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Set a value to create pending operations
      db.set('test', 'value');

      // Track events
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
      setImmediate(() => {
        if (writeCloseEmitted && !drainEmitted) {
          // Mutation is present - write_close fired without drain
          fail('write_close emitted before drain - mutation detected');
        } else if (drainEmitted && writeCloseEmitted) {
          // Original behavior - proper ordering
          done();
        }
        // If neither fired yet, wait a bit more
        setTimeout(() => {
          if (writeCloseEmitted && !drainEmitted) {
            fail('write_close emitted before drain - mutation detected');
          } else {
            done();
          }
        }, 100);
      });
    });
  });
});