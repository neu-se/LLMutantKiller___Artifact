import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { rimraf } from 'rimraf';
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should iterate over all keys when using forEach', (done) => {
    const db = new Dirty();
    const keys = ['key1', 'key2', 'key3'];
    const values = ['value1', 'value2', 'value3'];
    keys.forEach((key, index) => {
      db.set(key, values[index]);
    });

    let count = 0;
    db.forEach((key, value) => {
      count++;
      const index = keys.indexOf(key);
      if (index !== -1) {
        if (value !== values[index]) {
          done(new Error(`Value mismatch for key ${key}`));
        }
      } else {
        done(new Error(`Unknown key ${key}`));
      }
    });

    if (count !== keys.length) {
      done(new Error(`Expected ${keys.length} keys, but got ${count}`));
    } else {
      done();
    }
  });
});