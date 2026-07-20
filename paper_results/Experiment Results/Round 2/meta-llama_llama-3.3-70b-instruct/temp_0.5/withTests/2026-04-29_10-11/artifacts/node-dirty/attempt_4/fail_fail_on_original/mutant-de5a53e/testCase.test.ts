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
          setTimeout(() => {
            try {
              const stats = fs.fstatSync(fs.openSync(filePath, 'r'));
              if (stats.size === 0) {
                done.fail('Write stream was not properly closed');
              } else {
                done();
              }
            } catch (err) {
              done.fail('Error checking file stats');
            }
          }, 100);
        });
      });
    });
  });
});