import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';

describe('Dirty', () => {
  it('emits drain event when there are no in-flight writes', (done) => {
    const dirty = new Dirty('test.db');
    dirty.on('load', () => {
      dirty.set('key', 'value', () => {
        dirty.set('key2', 'value2', () => {
          dirty.on('drain', () => {
            dirty._inFlightWrites = 0;
            dirty.on('drain', () => {
              done.fail('Should not emit drain event twice');
            });
            dirty._flush();
            setTimeout(() => {
              done();
            }, 100);
          });
        });
      });
    });
  });
});