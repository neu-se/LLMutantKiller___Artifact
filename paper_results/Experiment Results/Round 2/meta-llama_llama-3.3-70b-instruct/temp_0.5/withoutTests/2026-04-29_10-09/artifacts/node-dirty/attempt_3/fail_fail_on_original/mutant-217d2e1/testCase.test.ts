import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';

describe('Dirty', () => {
  it('should not return a string from the _load method when parsing a corrupted row', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      dirty._readStream.emit('data', '{"key":"test"}\n{"key":"test2", "val": "Stryker was here!"}\n');
      dirty._readStream.emit('end');
    });

    dirty.on('error', (err) => {
      expect(err.message).toBe('Could not load corrupted row: {"key":"test2", "val": "Stryker was here!"}');
      fs.unlinkSync(dbPath);
      done();
    });

    fs.writeFileSync(dbPath, '{"key":"test"}\n');
  });
});