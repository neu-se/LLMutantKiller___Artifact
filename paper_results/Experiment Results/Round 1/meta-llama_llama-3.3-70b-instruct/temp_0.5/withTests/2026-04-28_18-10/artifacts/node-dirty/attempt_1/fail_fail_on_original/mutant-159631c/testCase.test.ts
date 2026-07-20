import { Dirty } from '../../../lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';
import { rimraf } from 'rimraf';

describe('Dirty', () => {
  it('should emit "read_close" event when read stream is closed', (done) => {
    const filePath = path.join(__dirname, 'test.dirty');
    const db = new Dirty(filePath);

    db.on('load', () => {
      db.on('read_close', () => {
        done();
      });
      db.close();
    });
  });
});