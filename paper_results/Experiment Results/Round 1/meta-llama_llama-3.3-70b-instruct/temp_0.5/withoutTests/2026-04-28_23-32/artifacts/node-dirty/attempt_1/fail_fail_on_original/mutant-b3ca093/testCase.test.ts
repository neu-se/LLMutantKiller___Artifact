import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';
import { rimraf } from 'rimraf';

describe('Dirty', () => {
  it('should flush queue when not waiting for drain', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);
    dirty.set('key', 'value', () => {
      dirty.set('key2', 'value2', () => {
        dirty.once('drain', () => {
          const data = fs.readFileSync(dbPath, 'utf8');
          expect(data).toContain('key');
          expect(data).toContain('key2');
          rimraf.sync(dbPath);
          done();
        });
      });
    });
  });
});