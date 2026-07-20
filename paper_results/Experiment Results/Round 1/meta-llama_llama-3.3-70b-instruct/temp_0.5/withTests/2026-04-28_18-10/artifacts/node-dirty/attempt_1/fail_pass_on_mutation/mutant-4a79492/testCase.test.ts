import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty db', function () {
  it('should emit drain event when queue is empty', function (done) {
    const db = new Dirty();
    const key = 'testKey';
    const value = 'testValue';

    db.on('drain', () => {
      if (db._queue.size === 0) {
        done();
      } else {
        done(new Error('Queue is not empty'));
      }
    });

    db.set(key, value);
  });
});