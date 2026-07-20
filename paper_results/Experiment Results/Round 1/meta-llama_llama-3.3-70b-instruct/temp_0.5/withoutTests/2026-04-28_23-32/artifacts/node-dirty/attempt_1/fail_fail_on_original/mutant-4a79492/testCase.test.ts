import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should emit drain event when there are no more writes in the queue', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      dirty.set('key', 'value', () => {
        dirty.set('key2', 'value2', () => {
          dirty.once('drain', () => {
            fs.readFile(dbPath, 'utf8', (err, data) => {
              if (err) {
                done(err);
              } else {
                expect(data).toBe('{"key":"value"}\n{"key2":"value2"}\n');
                rimraf(dbPath, () => {
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