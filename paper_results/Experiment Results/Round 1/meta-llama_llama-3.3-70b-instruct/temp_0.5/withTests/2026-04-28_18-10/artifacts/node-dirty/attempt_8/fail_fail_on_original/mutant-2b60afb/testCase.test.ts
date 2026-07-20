import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty', () => {
  it('should fire drain event when queue is empty', (done) => {
    const filePath = path.join(__dirname, 'test.dirty');
    const db = new Dirty(filePath);

    db.on('load', () => {
      db.set('key', 'value');
      db.set('key2', 'value2');
      let count = 0;
      db.on('drain', () => {
        count++;
        if (count === 2) {
          db.close();
          done();
        }
      });
    });
  });
});