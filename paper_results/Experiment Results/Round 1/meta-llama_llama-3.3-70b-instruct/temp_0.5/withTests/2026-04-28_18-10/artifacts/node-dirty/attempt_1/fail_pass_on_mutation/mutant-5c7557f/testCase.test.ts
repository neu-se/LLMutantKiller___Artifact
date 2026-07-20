import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('dirty db', () => {
  it('should emit drain event after write', (done) => {
    const filePath = path.join(__dirname, 'test.dirty');
    const db = new Dirty(filePath);

    db.on('load', () => {
      db.set('key', 'value');
    });

    db.on('drain', () => {
      db.close();
      fs.unlinkSync(filePath);
      done();
    });
  });
});