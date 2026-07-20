import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import { expect } from '@jest/globals';

describe('test-mutation', function () {
  it('should fire error event when file does not exist', function (done) {
    const file = 'test-mutation.dirty';

    const db = new Dirty(file);
    db.on('load', (length) => {
      expect(length).toBe(0);
      done();
    });

    db.on('error', (err) => {
      if (err.code === 'ENOENT') {
        expect(true).toBe(false);
      } else {
        expect(true).toBe(false);
      }
    });
  });
});