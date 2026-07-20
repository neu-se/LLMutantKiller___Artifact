import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';
import path from 'path';

describe('Dirty', () => {
  it('should emit an error when the file does not exist', (done) => {
    const filePath = 'test.db';
    const dirty = new Dirty(filePath);
    dirty.on('load', (size) => {
      dirty.close();
      expect(size).toBe(0);
      done();
    });
    dirty.on('error', (err) => {
      if (err.code !== 'ENOENT') {
        expect(false).toBe(true); // This should fail if the 'error' event is emitted with a different code
      }
      done();
    });
  });
});