import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should close streams when close is called and there are no pending writes', (done) => {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);

    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        db.close();
        setTimeout(() => {
          try {
            fs.accessSync(filePath);
            done(new Error('File should be closed'));
          } catch (err) {
            if (err.code !== 'ENOENT') {
              done(err);
            } else {
              done();
            }
          }
        }, 100);
      });
    });
  });
});