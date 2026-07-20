import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty', function () {
  it('should stop writing to disk when the write queue is full', function (done) {
    const filePath = path.join(process.cwd(), 'test.dirty');
    const db = new Dirty(filePath);

    db.set('key1', 'value1', () => {
      db.set('key2', 'value2', () => {
        db.set('key3', 'value3');
      });
    });

    db.on('drain', () => {
      db.set('key4', 'value4');
      const contents = fs.readFileSync(filePath, 'utf-8');
      const lines = contents.split('\n');
      if (lines.length > 4) {
        throw new Error('Expected write queue to be full');
      }
      db.close();
      fs.unlinkSync(filePath);
      done();
    });
  });
});