import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('dirty api', function () {
  it('should handle chunk with newline', function (done) {
    const tmpPath = path.join(__dirname, 'tmp.dirty');
    const db = new Dirty(tmpPath);

    db.on('load', () => {
      const chunk = '{"key":"x","val":"y"}\n';
      const writeStream = fs.createWriteStream(tmpPath, { flags: 'a' });
      writeStream.write(chunk);
      writeStream.end();

      db.on('load', (length) => {
        assert.strictEqual(length, 1);
        assert.strictEqual(db.get('x'), 'y');
        done();
      });
    });
  });
});