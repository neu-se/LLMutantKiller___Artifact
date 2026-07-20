import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should emit "read_close" event when read stream is closed', (done) => {
    const filePath = 'test.dirty';
    fs.writeFileSync(filePath, '');
    const db = new Dirty(filePath);

    db.on('load', () => {
      db.on('read_close', () => {
        fs.unlinkSync(filePath);
        done();
      });
      db.close();
    });
  });
});