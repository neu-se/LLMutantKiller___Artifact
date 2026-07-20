import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty', () => {
  it('should fire drain event when queue is empty', (done) => {
    const filePath = path.join(__dirname, 'test.dirty');
    const db = new Dirty(filePath);

    db.on('load', () => {
      db.set('key', 'value', () => {
        db.set('key2', 'value2', () => {
          db.on('drain', () => {
            db.close();
            done();
          });
        });
      });
    });
  });
});