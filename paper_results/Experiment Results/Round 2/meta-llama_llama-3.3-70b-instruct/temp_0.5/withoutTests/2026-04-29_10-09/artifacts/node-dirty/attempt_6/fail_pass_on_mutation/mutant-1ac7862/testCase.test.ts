import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should write multiple key-value pairs to the database file in the correct order when setting multiple values in quick succession with callbacks', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      let count = 0;
      dirty.set('key1', 'value1', () => {
        count++;
      });
      dirty.set('key2', 'value2', () => {
        count++;
      });
      dirty.set('key3', 'value3', () => {
        count++;
        dirty.close();
        fs.readFile(dbPath, 'utf8', (err, data) => {
          if (err) {
            done(err);
          } else {
            const lines = data.split('\n');
            expect(lines.length).toBe(4); // 3 key-value pairs + 1 empty line
            expect(lines[0]).toContain('key1');
            expect(lines[1]).toContain('key2');
            expect(lines[2]).toContain('key3');
            expect(count).toBe(3);
            fs.unlinkSync(dbPath);
            done();
          }
        });
      });
    });
  });
});