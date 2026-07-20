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
            const lines = data.split('\n');
            expect(lines.length).toBe(2); 
            expect(lines[0]).toMatch(/^{"key":"key","val":"value"}$/); 
            expect(lines[1]).toBe(''); 
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