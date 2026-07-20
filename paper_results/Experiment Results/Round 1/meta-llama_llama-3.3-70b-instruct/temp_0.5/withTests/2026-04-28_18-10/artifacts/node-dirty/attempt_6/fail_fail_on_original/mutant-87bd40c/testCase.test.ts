import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty db file close', () => {
  it('should destroy read stream when closing', (done) => {
    const filePath = path.join(__dirname, 'tmp', 'close.dirty');
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, '');
    const db = new Dirty(filePath);

    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        db.close();
        db.on('write_close', () => {
          if (db._readStream && db._readStream.destroyed) {
            done();
          } else {
            done('Read stream was not destroyed');
          }
        });
      });
    });
  });
});