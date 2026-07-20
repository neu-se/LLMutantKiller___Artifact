import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as rimraf from 'rimraf';

describe('Dirty', () => {
  it('should emit drain event when write queue is empty', (done) => {
    const dirty = new Dirty('test.db');
    dirty.on('drain', () => {
      done();
    });
    dirty.set('key', 'value', () => {
      dirty.set('key', undefined, () => {
        dirty.set('key', 'value', () => {
          // This should trigger the drain event
        });
      });
    });
    dirty.on('error', (err) => {
      done(err);
    });
    dirty.on('load', () => {
      // Load event should be emitted before drain event
    });
  });
});