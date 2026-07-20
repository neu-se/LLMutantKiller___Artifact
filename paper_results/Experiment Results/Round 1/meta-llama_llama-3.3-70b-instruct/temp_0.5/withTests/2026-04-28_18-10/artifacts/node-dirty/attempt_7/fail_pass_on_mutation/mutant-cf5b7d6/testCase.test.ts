import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', function () {
  it('should handle data correctly when loading from file', function (done) {
    const tmpDir = `${path.join(__dirname, 'tmp')}`;
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir);
    }
    const file = `${tmpDir}/test.dirty`;
    fs.writeFileSync(file, '{"key":"test","val":"value"}\n');

    const db = new Dirty(file);
    db.on('load', () => {
      db.set('key', 'new_value');
      db.on('drain', () => {
        const data = fs.readFileSync(file, 'utf-8');
        if (data.includes('Stryker was here!')) {
          done(new Error('Unexpected string found'));
        } else {
          fs.unlinkSync(file);
          done();
        }
      });
    });
  });
});