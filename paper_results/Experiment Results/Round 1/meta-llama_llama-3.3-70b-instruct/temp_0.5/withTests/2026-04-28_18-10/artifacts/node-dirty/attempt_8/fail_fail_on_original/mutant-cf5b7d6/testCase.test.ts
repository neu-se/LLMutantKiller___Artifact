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
    fs.writeFileSync(file, 'Stryker was here!\n');

    const db = new Dirty(file);
    db.on('error', (err) => {
      if (err.message === 'Empty lines never appear in a healthy database') {
        done();
      } else {
        done(new Error('Expected error not thrown'));
      }
    });
  });
});