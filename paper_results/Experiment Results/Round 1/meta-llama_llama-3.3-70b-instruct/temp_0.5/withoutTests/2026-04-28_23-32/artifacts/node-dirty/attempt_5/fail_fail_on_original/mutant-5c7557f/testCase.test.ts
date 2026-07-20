import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';
import { rmSync } from 'fs';

describe('Dirty', () => {
  it('should emit drain when queue is empty and in-flight writes are done', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    dirty.set('key', 'value', () => {
      dirty.set('key', undefined, () => {
        dirty.on('drain', () => {
          dirty.close();
          expect(dirty._writeStream).toBeNull();
          done();
        });
      });
    });
  });

  afterAll(() => {
    rmSync('test.db', { force: true });
  });
});