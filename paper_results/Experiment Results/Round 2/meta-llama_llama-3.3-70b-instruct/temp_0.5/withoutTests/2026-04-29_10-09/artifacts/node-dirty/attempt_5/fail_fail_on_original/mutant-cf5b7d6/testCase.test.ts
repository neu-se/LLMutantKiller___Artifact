import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty', () => {
  it('should handle data correctly', (done) => {
    const path = 'test.db';
    const dirty = new Dirty(path);

    dirty.on('load', (size) => {
      expect(size).toBe(0);
      dirty.set('key', 'value', () => {
        dirty.close();
        fs.readFile(path, 'utf8', (err, data) => {
          if (err) {
            done(err);
          } else {
            expect(data).not.toContain('Stryker was here!');
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
});