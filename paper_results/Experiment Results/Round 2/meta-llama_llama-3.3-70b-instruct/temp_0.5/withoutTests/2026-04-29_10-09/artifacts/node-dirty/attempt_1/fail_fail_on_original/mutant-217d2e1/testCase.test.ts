import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should not return a string from the _load method when parsing a corrupted row', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    dirty.on('error', (err) => {
      expect(err.message).toBe('Could not load corrupted row: {"key":"test"}');
      rimraf.sync(dbPath);
      done();
    });

    dirty.on('load', () => {
      dirty._readStream.emit('data', '{"key":"test"}\n');
    });

    fs.writeFileSync(dbPath, '{"key":"test"}');
  });
});