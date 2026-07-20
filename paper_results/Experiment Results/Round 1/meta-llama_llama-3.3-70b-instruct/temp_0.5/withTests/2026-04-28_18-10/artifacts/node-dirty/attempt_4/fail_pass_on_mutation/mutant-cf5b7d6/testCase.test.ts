import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', function () {
  it('should not return a string when parsing a row', function (done) {
    const tmpDir = `${path.join(__dirname, 'tmp')}`;
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir);
    }
    const file = `${tmpDir}/test.dirty`;
    fs.writeFileSync(file, '{"key":"test","val":"value"}\n{"key":"test2","val":"value2"}\n"');

    const db = new Dirty(file);
    db.on('error', (err) => {
      if (err.message === 'Empty lines never appear in a healthy database') {
        done(new Error('Expected error message does not match'));
      } else {
        done();
      }
    });
  });
});