import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty db', function () {
  it('should write to disk with correct encoding', function (done) {
    const file = 'test.dirty';
    const db = new Dirty(file);
    db.set('key', 'value');
    db.on('drain', () => {
      const fd = fs.openSync(file, 'r');
      const buffer = Buffer.alloc(1024);
      const bytesRead = fs.readSync(fd, buffer, 0, 1024, 0);
      fs.closeSync(fd);
      if (buffer.slice(0, bytesRead).toString('utf8') !== '{"key":"key","val":"value"}\n') {
        throw new Error('Invalid encoding');
      }
      fs.unlinkSync(file);
      done();
    });
  });
});