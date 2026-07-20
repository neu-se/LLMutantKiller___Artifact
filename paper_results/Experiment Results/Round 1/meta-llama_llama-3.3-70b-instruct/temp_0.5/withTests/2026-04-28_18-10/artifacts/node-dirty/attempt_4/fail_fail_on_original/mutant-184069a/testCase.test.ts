import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty db', () => {
  it('should handle ENOENT error correctly', (done) => {
    const filePath = path.join(__dirname, 'non-existent-file.dirty');
    const db = new Dirty(filePath);

    db.on('load', (length) => {
      expect(true).toBe(false);
      done();
    });

    db.on('error', (err) => {
      expect(err.code).toBe('ENOENT');
      done();
    });
  });
});