import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import { rimraf } from 'rimraf';

describe('Dirty', () => {
  it('should emit error when there are no callbacks and an error occurs', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);
    dirty.on('error', (err) => {
      expect(err).toBeInstanceOf(Error);
      rimraf(dbPath, () => {
        done();
      });
    });
    dirty.set('key', 'value', () => {
      // This should not be called
    });
    dirty._writeStream.emit('error', new Error('Test error'));
  });
});