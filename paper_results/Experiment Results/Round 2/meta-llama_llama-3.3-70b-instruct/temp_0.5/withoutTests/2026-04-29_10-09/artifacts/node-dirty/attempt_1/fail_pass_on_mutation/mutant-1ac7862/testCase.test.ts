import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should write multiple key-value pairs to the database file', (done) => {
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
              } else {
                const lines = data.split('\n');
                expect(lines.length).toBe(4); // 3 key-value pairs + 1 empty line
                expect(lines[0]).toBe('{"key":"key1","val":"value1"}');
                expect(lines[1]).toBe('{"key":"key2","val":"value2"}');
                expect(lines[2]).toBe('{"key":"key3","val":"value3"}');
                rimraf.sync(dbPath);
                done();
              }
            });
          });
        });
      });
    });
  });
});