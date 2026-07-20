import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should iterate over all keys when using forEach', (done) => {
    const db = new Dirty();
    db.set('key1', 'value1');
    db.set('key2', 'value2');
    db.set('key3', 'value3');

    let count = 0;
    db.forEach((key, value) => {
      count++;
      if (key === 'key2') {
        return true; // This should not stop the iteration in the original code
      }
    });

    if (count !== 3) {
      done(new Error(`Expected 3 keys, but got ${count}`));
    } else {
      done();
    }
  });
});