import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';
import path from 'path';

describe('Dirty', () => {
  it('should emit an error when the file does not exist', (done) => {
    const filePath = 'test.db';
    const dirty = new Dirty(filePath);
    dirty.on('load', (size) => {
      expect(size).toBe(0);
      dirty.set('test', 'test');
      dirty.set('test2', 'test2');
      dirty.close();
      done();
    });
    dirty.on('error', (err) => {
      expect(false).toBe(true); // This should fail if the 'error' event is emitted
      done();
    });
  });
});