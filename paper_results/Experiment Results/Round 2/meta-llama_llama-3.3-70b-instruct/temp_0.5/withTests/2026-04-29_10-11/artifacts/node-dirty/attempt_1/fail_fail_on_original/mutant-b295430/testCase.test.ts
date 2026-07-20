import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('dirty db file close', function () {
  it('should fire read_close event when closing', function (done) {
    const file = 'test.dirty';
    const db = new Dirty(file);

    db.on('load', () => {
      db.on('read_close', () => {
        done();
      });
      db.close();
    });
  });

  afterAll(async () => {
    await rimraf(file);
  });
});