import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('dirty load error handling', () => {
  it('should emit error with a message when encountering an empty line', (done) => {
    const tmpPath = path.join(__dirname, 'tmp');
    rimraf.sync(tmpPath);
    fs.mkdirSync(tmpPath);
    const filePath = path.join(tmpPath, 'test.dirty');
    fs.writeFileSync(filePath, '\n');

    const db = new Dirty(filePath);
    db.on('error', (err) => {
      expect(err.message).not.toBe('');
      done();
    });
  });
});