import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty close method', function () {
  it('should not close write stream if _writeStream is null', function (done) {
    const db = new Dirty();
    db.close();
    db.on('write_close', () => {
      done.fail('write_close event should not be emitted');
    });
    setTimeout(() => {
      done();
    }, 10);
  });
});