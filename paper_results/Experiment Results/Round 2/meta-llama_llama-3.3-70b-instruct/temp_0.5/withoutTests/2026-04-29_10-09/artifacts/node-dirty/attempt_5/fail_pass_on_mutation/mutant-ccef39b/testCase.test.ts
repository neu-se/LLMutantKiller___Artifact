import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';

describe('Dirty', () => {
  it('should close the file streams when there are pending writes', (done) => {
    const path = 'test.db';
    const dirty = new Dirty(path);

    dirty.set('key', 'value', () => {
      dirty.set('key2', 'value2');
      dirty.close();
      // The mutated code will not emit 'drain' when there are pending writes
      // and the queue is not empty, so we expect the event to be emitted in the original code
      dirty.once('drain', () => {
        expect(dirty._inFlightWrites).toBe(0);
        done();
      });
      dirty.once('error', () => {
        done.fail('An error occurred');
      });
    });
  });
});