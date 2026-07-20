import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty db', () => {
  it('should handle ENOENT error correctly', (done) => {
    const filePath = path.join(__dirname, 'non-existent-file.dirty');
    const db = new Dirty(filePath);

    db.on('load', (length) => {
      done.fail('load event should not be fired with length');
    });

    db.on('error', (err) => {
      expect(err.code).not.toBe('ENOENT');
      done();
    });
  });
});