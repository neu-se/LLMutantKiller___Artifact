import { Dirty } from '../../../lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';
import { rimraf } from 'rimraf';

describe('Dirty', () => {
  it('should emit load event with size 0 when file does not exist', (done) => {
    const filePath = 'test-dirty.db';
    rimraf.sync(filePath);

    const dirty = new Dirty(filePath);
    dirty.on('load', (size) => {
      expect(size).toBe(0);
      done();
    });
  });
});