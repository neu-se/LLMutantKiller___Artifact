import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty', () => {
  it('should emit drain event when queue is empty', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      dirty.set('key', 'value', () => {
        dirty.on('drain', () => {
          dirty.rm('key', () => {
            dirty.on('drain', () => {
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