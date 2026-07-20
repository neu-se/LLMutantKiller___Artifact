import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty db file close', () => {
  it('should destroy read stream when closing', (done) => {
    const filePath = path.join(__dirname, 'tmp', 'close.dirty');
    const db = new Dirty(filePath);

    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        db.close();
        db.on('write_close', () => {
          try {
            fs.accessSync(filePath);
            done();
          } catch (err) {
            done.fail('File should exist after close');
          }
        });
        db.on('error', (err) => {
          done.fail('Error occurred while closing database');
        });
      });
    });
  });
});