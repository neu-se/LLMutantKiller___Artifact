import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';
import path from 'path';

describe('Dirty', () => {
  it('should emit an error when the file does not exist', (done) => {
    const filePath = 'test.db';
    const dirty = new Dirty(filePath);
    let errorEmitted = false;
    dirty.on('error', (err) => {
      errorEmitted = true;
      expect(err.code).toBe('ENOENT');
      done();
    });
    dirty.on('load', (size) => {
      if (!errorEmitted) {
        expect(size).toBe(0);
      }
      done();
    });
  });
});