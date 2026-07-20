import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty', () => {
  it('should handle data correctly', (done) => {
    const path = 'test.db';
    fs.writeFileSync(path, '{"key":"key","val":"value"}\n');
    const dirty = new Dirty(path);

    dirty.on('load', (size) => {
      expect(size).toBe(1);
      dirty.close();
      fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
          done(err);
        } else {
          expect(data).toBe(`{"key":"key","val":"value"}\n`);
          fs.unlink(path, (err) => {
            if (err) {
              done(err);
            } else {
              done();
            }
          });
        }
      });
    });
  });
});