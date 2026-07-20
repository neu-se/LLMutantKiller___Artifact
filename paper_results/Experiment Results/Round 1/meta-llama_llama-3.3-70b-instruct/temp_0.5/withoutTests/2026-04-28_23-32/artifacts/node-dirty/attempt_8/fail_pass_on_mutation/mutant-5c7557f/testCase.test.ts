import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';
import { rmSync } from 'fs';

describe('Dirty', () => {
  it('should emit drain when queue is empty and in-flight writes are done', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    let drainCount = 0;
    dirty.on('drain', () => {
      drainCount++;
      if (drainCount === 1) {
        dirty.set('key', 'value', () => {
          dirty.set('key', undefined, () => {
            // Do nothing
          });
        });
      } else if (drainCount === 2) {
        expect(dirty.size()).toBe(0);
        done();
      }
    });

    dirty.set('key', 'value', () => {
      dirty.set('key', undefined, () => {
        // Do nothing
      });
    });
  }, 10000);

  afterAll(() => {
    rmSync('test.db', { force: true });
  });
});