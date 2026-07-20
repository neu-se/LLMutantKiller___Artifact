import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty db file close', function () {
  it('should fire read_close event when closing', function (done) {
    const file = 'test.dirty';
    const db = new Dirty(file);

    db.on('load', () => {
      db.on('read_close', () => {
        done();
      });
      db.on('error', (err) => {
        done.fail(err);
      });
      db.close();
    });
  });

  afterAll(() => {
    try {
      fs.unlinkSync('test.dirty');
    } catch (err) {
      // intentionally ignored
    }
  });
});