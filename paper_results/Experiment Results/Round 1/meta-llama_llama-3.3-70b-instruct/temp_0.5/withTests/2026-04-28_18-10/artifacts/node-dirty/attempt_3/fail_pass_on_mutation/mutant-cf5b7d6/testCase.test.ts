import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', function () {
  it('should parse JSON correctly when loading from file', function (done) {
    const tmpDir = `${path.join(__dirname, 'tmp')}`;
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir);
    }
    const file = `${tmpDir}/test.dirty`;
    fs.writeFileSync(file, '{"key":"test","val":"value"}\n');

    const db = new Dirty(file);
    db.on('load', () => {
      const value = db.get('test');
      if (typeof value!== 'string' || value!== 'value') {
        done(new Error('Failed to parse JSON correctly'));
      } else {
        fs.unlinkSync(file);
        done();
      }
    });
  });
});