import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { fs } from 'fs';
import { assert } from 'assert';

describe('Dirty', () => {
  it('should close write stream only when it exists', (done) => {
    const db = new Dirty('test.dirty');
    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        db.close();
        db.on('write_close', () => {
          fs.access('test.dirty', (err) => {
            if (err) {
              throw new Error('File should exist');
            }
            done();
          });
        });
      });
    });
  });
});