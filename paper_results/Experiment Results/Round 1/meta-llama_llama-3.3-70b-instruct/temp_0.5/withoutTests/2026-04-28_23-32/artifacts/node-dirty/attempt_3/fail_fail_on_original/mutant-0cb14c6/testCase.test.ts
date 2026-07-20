import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';

describe('Dirty', () => {
  it('emits drain event when there are no in-flight writes', (done) => {
    const dirty = new Dirty('test.db');
    dirty.on('load', () => {
      dirty.set('key', 'value', () => {
        dirty.on('drain', () => {
          dirty.close();
          dirty.on('drain', () => {
            // This should not be called in the mutated code
            done(new Error('Drain event should not be emitted after close'));
          });
          setTimeout(() => {
            // If the drain event is not emitted, the test should pass
            done();
          }, 100);
        });
      });
    });
  });
});