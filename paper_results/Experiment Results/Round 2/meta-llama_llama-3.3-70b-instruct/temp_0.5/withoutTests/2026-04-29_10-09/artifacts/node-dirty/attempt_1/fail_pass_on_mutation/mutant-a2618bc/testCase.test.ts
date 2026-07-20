import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should write to disk when queue is flushed', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    dirty.set('key1', 'value1');
    dirty.set('key2', 'value2');

    dirty.on('drain', () => {
      fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
          done(err);
          return;
        }

        const lines = data.split('\n');
        expect(lines.length).toBe(3); // 2 lines for key1 and key2, and 1 empty line
        expect(lines[0]).toContain('key1');
        expect(lines[1]).toContain('key2');

        rimraf.sync(dbPath);
        done();
      });
    });
  });
});