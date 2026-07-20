import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should emit drain event after setting and removing multiple values', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      dirty.set('key1', 'value1', () => {
        dirty.set('key2', 'value2', () => {
          dirty.set('key3', 'value3', () => {
            dirty.rm('key1', () => {
              dirty.rm('key2', () => {
                dirty.rm('key3', () => {
                  dirty.on('drain', () => {
                    expect(dirty.get('key1')).toBeUndefined();
                    expect(dirty.get('key2')).toBeUndefined();
                    expect(dirty.get('key3')).toBeUndefined();
                    dirty.close();
                    fs.unlinkSync(dbPath);
                    done();
                  });
                  if (dirty._queue.size === 0 && dirty._inFlightWrites === 0) {
                    throw new Error('Expected drain event to be emitted');
                  }
                });
              });
            });
          });
        });
      });
    });
  }, 10000);
});