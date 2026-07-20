import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should write multiple key-value pairs to the database file in a specific order', (done) => {
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
                // Check that key1 is written before key2
                const key1Index = data.indexOf('key1');
                const key2Index = data.indexOf('key2');
                expect(key1Index).toBeLessThan(key2Index);
                // Check that key2 is written before key3
                const key3Index = data.indexOf('key3');
                expect(key2Index).toBeLessThan(key3Index);
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