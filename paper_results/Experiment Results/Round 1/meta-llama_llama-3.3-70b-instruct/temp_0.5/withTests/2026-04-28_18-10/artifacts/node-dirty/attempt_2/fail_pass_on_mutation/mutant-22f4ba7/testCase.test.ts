import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should close streams when close is called after setting a key', (done) => {
    const filePath = 'test.dirty';
    fs.writeFileSync(filePath, '');
    const db = new Dirty(filePath);

    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        db.close();
        setTimeout(() => {
          try {
            fs.accessSync(filePath);
            done.fail('File should not be accessible after close');
          } catch (err) {
            fs.unlinkSync(filePath);
            done();
          }
        }, 100);
      });
    });
  });
});