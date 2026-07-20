import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should write to disk when queue is flushed with multiple keys', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    dirty.set('key1', 'value1');
    dirty.set('key2', 'value2');
    dirty.set('key3', 'value3');

    dirty.on('drain', () => {
      dirty.set('key4', 'value4');
      dirty.set('key5', 'value5');

      dirty.on('drain', () => {
        fs.readFile(dbPath, 'utf8', (err, data) => {
          if (err) {
            done(err);
            return;
          }

          const lines = data.split('\n');
          expect(lines.length).toBeGreaterThan(6); // At least 5 lines for key1, key2, key3, key4, and key5, and 1 empty line
          expect(lines[0]).toContain('key1');
          expect(lines[1]).toContain('key2');
          expect(lines[2]).toContain('key3');
          expect(lines[3]).toContain('key4');
          expect(lines[4]).toContain('key5');

          rimraf.sync(dbPath);
          done();
        });
      });
    });
  });
});