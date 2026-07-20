import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import assert from 'assert';

describe('dirty api', function () {
  it('should handle chunk correctly', function (done) {
    const tmpPath = path.join(__dirname, 'tmp.dirty');
    const db = new Dirty(tmpPath);

    db.on('load', () => {
      const chunk = '{"key":"x","val":"y"}';
      fs.appendFileSync(tmpPath, chunk);
      db._load();

      db.once('load', (length) => {
        assert.strictEqual(length, 0);
        const chunk2 = '{"key":"z","val":"w"}\n';
        fs.appendFileSync(tmpPath, chunk2);
        db._load();

        db.once('load', (length2) => {
          assert.strictEqual(length2, 1);
          assert.strictEqual(db.get('z'), 'w');
          done();
        });
      });
    });
  });
});