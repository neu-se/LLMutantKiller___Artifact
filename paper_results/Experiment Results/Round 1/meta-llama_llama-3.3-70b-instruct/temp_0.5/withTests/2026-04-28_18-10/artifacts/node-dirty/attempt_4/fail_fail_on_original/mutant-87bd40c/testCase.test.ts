import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty db file close', () => {
  it('should destroy read stream when closing', (done) => {
    const filePath = path.join(__dirname, 'tmp', 'close.dirty');
    fs.writeFileSync(filePath, '');
    const db = new Dirty(filePath);

    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        const originalDestroy = db._readStream.destroy;
        let destroyCalled = false;
        db._readStream.destroy = () => {
          destroyCalled = true;
          originalDestroy.call(db._readStream);
        };
        db.close();
        db.on('write_close', () => {
          if (!destroyCalled) {
            done.fail('Read stream was not destroyed');
          }
          done();
        });
      });
    });
  });
});