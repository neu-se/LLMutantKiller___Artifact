import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should write multiple values to the database', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      dirty.set('key1', 'value1', () => {
        dirty.set('key2', 'value2', () => {
          dirty.set('key3', 'value3', () => {
            dirty.close();
            fs.readFile(dbPath, 'utf8', (err, data) => {
              if (err) {
                done(err);
                return;
              }
              const lines = data.split('\n');
              expect(lines.length).toBe(4); // 3 data lines and 1 empty line
              expect(lines[0].trim()).toBe('{"key":"key1","val":"value1"}');
              expect(lines[1].trim()).toBe('{"key":"key2","val":"value2"}');
              expect(lines[2].trim()).toBe('{"key":"key3","val":"value3"}');
              rimraf.sync(dbPath);
              done();
            });
          });
        });
      });
    });
  });
});