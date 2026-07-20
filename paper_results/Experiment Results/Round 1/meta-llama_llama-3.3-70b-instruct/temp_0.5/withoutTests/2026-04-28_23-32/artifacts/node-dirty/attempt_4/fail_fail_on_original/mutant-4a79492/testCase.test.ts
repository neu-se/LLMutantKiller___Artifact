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
          dirty.on('drain', () => {
            dirty.set('key3', 'value3', () => {
              dirty.on('drain', () => {
                expect(dirty._queue.size).toBe(0);
                fs.readFile(dbPath, 'utf8', (err, data) => {
                  if (err) {
                    done(err);
                  } else {
                    expect(data).toBe('{"key":"value"}\n{"key2":"value2"}\n{"key3":"value3"}\n');
                    fs.unlink(dbPath, () => {
                      done();
                    });
                  }
                });
              });
            });
          });
        });
      });
    });
  });
});