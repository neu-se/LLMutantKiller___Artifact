import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('emits drain event when there are no in-flight writes', (done) => {
    const dirty = new Dirty('test.db');
    dirty.on('load', () => {
      dirty.set('key', 'value', () => {
        dirty.on('drain', () => {
          // Simulate an error to make _inFlightWrites negative
          dirty._inFlightWrites = -1;
          dirty._writeStream.emit('drain');
          done();
        });
      });
    });
  });
});