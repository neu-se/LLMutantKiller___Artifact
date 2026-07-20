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
            setTimeout(() => {
              try {
                fs.accessSync(filePath, fs.constants.W_OK);
                done();
              } catch (err) {
                done();
              }
            }, 100);
          });
        });
      });
    });
  });
});