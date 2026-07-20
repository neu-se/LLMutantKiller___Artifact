import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import { join } from 'path';
import { rimraf } from 'rimraf';

describe('Dirty', () => {
  it('should emit error when there are no callbacks and an error occurs', (done) => {
    const dbPath = join(__dirname, 'test.db');
    const dirty = new Dirty(dbPath);
    const error = new Error('Test error');

    dirty._writeStream.write = () => {
      return false;
    };

    dirty._writeStream.emit('error', error);

    dirty._flush();

    dirty.once('error', (err) => {
      expect(err).toBe(error);
      rimraf.sync(dbPath);
      done();
    });

    dirty.set('key', 'value');
  });
});