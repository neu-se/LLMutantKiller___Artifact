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
            dirty._writeStream.emit('drain'); // This should not emit 'drain' event in the original code
            dirty.on('drain', () => {
              // This should not be called in the original code
              done(new Error('Drain event should not be emitted with negative in-flight writes'));
            });
            setTimeout(() => {
              // If the drain event is not emitted, the test should pass
              dirty.close();
              done();
            }, 100);
          });
        });
      });
    });
  });
});