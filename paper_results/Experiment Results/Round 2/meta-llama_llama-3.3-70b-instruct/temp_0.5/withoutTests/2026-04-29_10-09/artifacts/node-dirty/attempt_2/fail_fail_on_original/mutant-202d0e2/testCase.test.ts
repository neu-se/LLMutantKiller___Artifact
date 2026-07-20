import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import { rmSync } from 'fs';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should emit drain event after setting multiple values', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    let count = 0;
    dirty.on('load', () => {
      dirty.set('key1', 'value1', () => {
        dirty.set('key2', 'value2', () => {
          dirty.set('key3', 'value3', () => {
            dirty.on('drain', () => {
              count++;
              expect(count).toBe(1);
              expect(dirty.get('key1')).toBe('value1');
              expect(dirty.get('key2')).toBe('value2');
              expect(dirty.get('key3')).toBe('value3');
              dirty.close();
              rimraf.sync(dbPath);
              done();
            });
          });
        });
      });
    });
  });
});