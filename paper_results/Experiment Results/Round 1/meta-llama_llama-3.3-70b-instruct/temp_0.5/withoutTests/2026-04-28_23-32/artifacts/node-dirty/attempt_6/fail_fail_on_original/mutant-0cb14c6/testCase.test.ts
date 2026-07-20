import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';

describe('Dirty', () => {
  it('emits drain event when there are no in-flight writes', (done) => {
    const dirty = new Dirty('test.db');
    dirty.on('load', () => {
      dirty.set('key', 'value', () => {
        dirty.set('key2', 'value2', () => {
          dirty.on('drain', () => {
            dirty._inFlightWrites = -1; // Simulate the mutated condition
            dirty.on('drain', () => {
              // This should be called in the mutated code
              done.fail('Drain event should not be emitted with negative in-flight writes');
            });
            dirty._writeStream.on('drain', () => {
              // This should not be called in the original code
              if (dirty._inFlightWrites < 0) {
                done();
              } else {
                done.fail('Drain event should not be emitted with negative in-flight writes');
              }
            });
          });
        });
      });
    });
  });
});