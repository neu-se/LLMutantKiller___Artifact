import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should emit drain event when there are no more writes in the queue', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      dirty.set('key', 'value', () => {
        dirty.set('key2', 'value2', () => {
          let drainCount = 0;
          dirty.on('drain', () => {
            drainCount++;
          });
          dirty.on('write_close', () => {
            if (drainCount === 2) {
              fs.readFile(dbPath, 'utf8', (err, data) => {
                if (err) {
                  done(err);
                } else {
                  expect(data).toBe('{"key":"value"}\n{"key2":"value2"}\n');
                  fs.unlink(dbPath, () => {
                    done();
                  });
                }
              });
            } else {
              done(new Error('Expected drain event to be emitted twice'));
            }
          });
          dirty.close();
        });
      });
    });
  });
});