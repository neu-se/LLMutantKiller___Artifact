import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should close the write stream properly', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      dirty.set('key', 'value', () => {
        dirty.close();
        dirty.on('write_close', () => {
          fs.fstat(dbPath, (err, stats) => {
            if (err) {
              done();
            } else {
              fs.access(dbPath, fs.constants.W_OK, (err) => {
                if (err) {
                  done();
                } else {
                  fs.ftruncate(dbPath, stats.size, (err) => {
                    if (err) {
                      done(err);
                    } else {
                      fs.fstat(dbPath, (err, newStats) => {
                        if (err) {
                          done(err);
                        } else {
                          if (newStats.size !== stats.size) {
                            done(new Error('Write stream not properly closed'));
                          } else {
                            done();
                          }
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
  });
});