import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('test-encoding', function () {
  it('should write to disk with correct encoding', function (done) {
    const file = 'test-encoding.dirty';
    const db = new Dirty(file);
    db.set('key', 'value');
    db.on('drain', () => {
      const contents = fs.readFileSync(file, 'utf8');
      if (contents !== `${JSON.stringify({key: 'key', val: 'value'})}\n`) {
        throw new Error('Encoding is incorrect');
      }
      fs.unlinkSync(file);
      done();
    });
    db.on('error', (err) => {
      if (err.code === 'ENOENT') {
        throw new Error('File not found');
      } else {
        throw new Error('Error occurred: ' + err);
      }
    });
    setTimeout(() => {
      if (fs.existsSync(file)) {
        const contents = fs.readFileSync(file, 'utf8');
        if (contents !== `${JSON.stringify({key: 'key', val: 'value'})}\n`) {
          throw new Error('Encoding is incorrect');
        }
      }
      done();
    }, 10000);
  });
});