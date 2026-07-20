import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty', () => {
  it('should handle data correctly', (done) => {
    const path = 'test.db';
    const dirty = new Dirty(path);

    dirty.on('load', (size) => {
      expect(size).toBe(0);
      dirty.set('key', 'value', () => {
        dirty.set('key2', 'value2', () => {
          dirty.close();
          fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
              done(err);
            } else {
              const lines = data.split('\n');
              expect(lines.length).toBe(3); // One line for the first data, one for the second data, and one empty line
              expect(lines[0]).toBe(`{"key":"key","val":"value"}`);
              expect(lines[1]).toBe(`{"key":"key2","val":"value2"}`);
              expect(lines[2]).toBe(''); // Check that there's no extra data
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
});