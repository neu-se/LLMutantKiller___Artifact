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
    });

    dirty.set('key', 'value', () => {
      dirty.set('key', undefined, () => {
        dirty.set('key', 'value', () => {
          dirty.set('key', undefined, () => {
            setTimeout(() => {
              expect(drainCount).toBe(2);
              done();
            }, 100);
          });
        });
      });
    });
  }, 10000);

  afterAll(() => {
    rmSync('test.db', { force: true });
  });
});