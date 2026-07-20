import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';
import path from 'path';

describe('Dirty', () => {
  it('should emit an error when the file does not exist', (done) => {
    const filePath = 'test.db';
    const dirty = new Dirty(filePath);
    dirty.on('error', (err) => {
      expect(err.code).toBe('ENOENT');
      done();
    });
    dirty.on('load', () => {
      done.fail('Expected an error to be emitted');
    });
  });
});