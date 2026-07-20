import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should emit "read_close" event when read stream is closed', (done) => {
    const filePath = 'test.db';
    const dirty = new Dirty(filePath);

    dirty.on('read_close', () => {
      fs.unlinkSync(filePath);
      done();
    });

    dirty.on('error', (err) => {
      fs.unlinkSync(filePath);
      done(err);
    });

    dirty.close();
  });
});