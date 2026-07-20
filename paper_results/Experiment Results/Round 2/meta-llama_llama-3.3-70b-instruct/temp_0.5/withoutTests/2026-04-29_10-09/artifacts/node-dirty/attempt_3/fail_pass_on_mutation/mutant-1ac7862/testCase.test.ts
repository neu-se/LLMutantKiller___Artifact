import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should write multiple key-value pairs to the database file', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      dirty.set('key1', 'value1', () => {
        dirty.set('key2', 'value2', () => {
          dirty.set('key3', 'value3', () => {
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
                fs.unlinkSync(dbPath);
                done();
              }
            });
          });
        });
      });
    });
  });
});