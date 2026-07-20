import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';

describe('Dirty', () => {
  it('should not return a string from the _load method when parsing a corrupted row', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      dirty._readStream.destroy();
      done();
    });

    dirty.on('error', (err) => {
      expect(err.message).not.toBe('Stryker was here!');
      fs.unlinkSync(dbPath);
      done();
    });

    fs.writeFileSync(dbPath, '{"key":"test", "val": {"key":"test2"}}\n');
  });
});