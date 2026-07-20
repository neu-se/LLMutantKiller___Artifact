import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty', () => {
  it('should emit drain event when queue is empty', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      dirty.set('key', 'value', () => {
        dirty.set('key2', 'value2', () => {
          dirty.on('drain', () => {
            dirty.set('key3', 'value3', () => {
              dirty.rm('key', () => {
                dirty.rm('key2', () => {
                  dirty.rm('key3', () => {
                    expect(dirty.size()).toBe(0);
                    dirty.close();
                    fs.unlink(dbPath, () => {
                      done();
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});