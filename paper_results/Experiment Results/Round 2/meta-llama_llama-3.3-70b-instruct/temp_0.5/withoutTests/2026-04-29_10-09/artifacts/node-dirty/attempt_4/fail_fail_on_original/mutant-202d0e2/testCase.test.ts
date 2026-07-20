import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should emit drain event after setting and removing multiple values', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    let count = 0;
    dirty.on('load', () => {
      dirty.set('key1', 'value1', () => {
        dirty.set('key2', 'value2', () => {
          dirty.set('key3', 'value3', () => {
            dirty.set('key1', undefined, () => {
              dirty.set('key2', undefined, () => {
                dirty.set('key3', undefined, () => {
                  dirty.on('drain', () => {
                    count++;
                    expect(count).toBe(1);
                    expect(dirty.get('key1')).toBeUndefined();
                    expect(dirty.get('key2')).toBeUndefined();
                    expect(dirty.get('key3')).toBeUndefined();
                    dirty.close();
                    fs.unlinkSync(dbPath);
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