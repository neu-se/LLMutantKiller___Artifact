import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should destroy write stream when closed', (done) => {
    const filePath = path.join(__dirname, 'test.dirty');
    const db = new Dirty(filePath);
    db.on('load', () => {
      db.set('key', 'value', () => {
        db.on('drain', () => {
          db.close();
          db.on('write_close', () => {
            fs.access(filePath, (err) => {
              if (err) {
                done.fail('Write stream was not properly closed');
              } else {
                done();
              }
            });
          });
        });
      });
    });
  });
});