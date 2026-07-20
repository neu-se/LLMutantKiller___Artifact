import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';

describe('Dirty', () => {
  it('should emit drain event when queue is empty and there are no in-flight writes', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      dirty.set('key', 'value', () => {
        dirty.set('key', undefined, () => {
          dirty.once('drain', () => {
            dirty.close();
            setTimeout(() => {
              fs.stat(dbPath, (err, stats) => {
                if (err) {
                  done(err);
                } else {
                  fs.unlink(dbPath, () => {
                    done();
                  });
                }
              });
            }, 10);
          });
          dirty.once('error', (err) => {
            done(new Error('Unexpected error: ' + err));
          });
        });
      });
    });
  });
});