import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import { rmSync } from 'fs';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should flush the queue when the write stream is drained', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      dirty.set('key', 'value', () => {
        expect(dirty.get('key')).toBe('value');
        dirty.close();
        rimraf.sync(dbPath);
        done();
      });
    });
  });
});