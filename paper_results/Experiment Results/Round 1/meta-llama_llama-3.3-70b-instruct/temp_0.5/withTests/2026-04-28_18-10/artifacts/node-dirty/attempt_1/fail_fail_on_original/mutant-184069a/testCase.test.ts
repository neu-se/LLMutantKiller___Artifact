import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import { rimraf } from 'rimraf';

describe('dirty db', () => {
  it('should fire error event when file does not exist', (done) => {
    const filePath = path.join(__dirname, 'non-existent-file.dirty');
    const db = new Dirty(filePath);

    db.on('load', () => {
      done.fail('load event should not be fired');
    });

    db.on('error', (err) => {
      expect(err.code).toBe('ENOENT');
      done();
    });
  });
});