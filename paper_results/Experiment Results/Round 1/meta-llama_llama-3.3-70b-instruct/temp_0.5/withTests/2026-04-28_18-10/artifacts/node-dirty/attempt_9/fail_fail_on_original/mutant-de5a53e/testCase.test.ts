import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty db', function () {
  it('should destroy write stream when closing the db', function (done) {
    const file = 'test.dirty';
    const db = new Dirty(file);
    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        db.close();
      });
    });
    db.on('write_close', () => {
      fs.open(file, 'a', (err, fd) => {
        if (err) {
          done();
        } else {
          fs.close(fd, (err) => {
            if (err) {
              done();
            } else {
              fs.open(file, 'a', (err, fd2) => {
                if (err) {
                  done();
                } else {
                  fs.write(fd2, 'test', (err) => {
                    if (err) {
                      done();
                    } else {
                      done(new Error('Write stream was not destroyed'));
                    }
                  });
                }
              });
            }
          });
        }
      });
    });
  });
});