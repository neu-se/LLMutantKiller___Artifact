import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty', function () {
  it('should stop writing to disk when the write stream is waiting for drain', function (done) {
    const filePath = path.join(process.cwd(), 'test.dirty');
    const db = new Dirty(filePath);

    db.set('key1', 'value1');
    db.set('key2', 'value2');
    db.set('key3', 'value3');

    let writes = 0;
    db._writeStream.on('write', () => {
      writes++;
    });

    db.on('drain', () => {
      db.set('key4', 'value4');
      db.set('key5', 'value5');
      setTimeout(() => {
        if (writes > 3) {
          throw new Error('Expected write stream to wait for drain');
        }
        db.close();
        fs.unlinkSync(filePath);
        done();
      }, 10);
    });
  });
});