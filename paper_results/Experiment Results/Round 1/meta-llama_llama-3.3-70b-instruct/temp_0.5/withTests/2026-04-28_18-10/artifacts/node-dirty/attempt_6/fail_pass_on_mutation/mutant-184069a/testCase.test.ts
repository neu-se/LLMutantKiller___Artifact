import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty db', () => {
  it('should handle ENOENT error correctly', (done) => {
    const filePath = path.join(__dirname, 'existing-file.dirty');
    fs.writeFileSync(filePath, '{"key":"x","val":"y"}\n{"key":"p","val":"q"}\n');
    const db = new Dirty(filePath);

    db.on('load', (length) => {
      expect(length).toBe(2);
      done();
    });

    db.on('error', (err) => {
      done(new Error('Error event should not be fired'));
    });
  });
});