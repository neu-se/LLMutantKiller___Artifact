import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty', () => {
  it('should load data correctly', (done) => {
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
            const lines = data.split('\n');
            expect(lines.length).toBe(2); // One line for the data and one empty line at the end
            expect(lines[0]).toBe(`{"key":"key","val":"value"}`);
            expect(lines[1]).toBe(''); // Check that there's no extra data
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