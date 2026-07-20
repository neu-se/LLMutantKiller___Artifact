import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', function () {
  it('should parse JSON correctly when loading from file', async function (done) {
    const file = `${path.join(__dirname, 'tmp')}/test.dirty`;
    fs.writeFileSync(file, '{"key":"test","val":"value"}\n');

    const db = new Dirty(file);
    db.on('load', () => {
      const value = db.get('test');
      if (typeof value !== 'string' || value !== 'value') {
        done(new Error('Failed to parse JSON correctly'));
      } else {
        done();
      }
    });
  });
});