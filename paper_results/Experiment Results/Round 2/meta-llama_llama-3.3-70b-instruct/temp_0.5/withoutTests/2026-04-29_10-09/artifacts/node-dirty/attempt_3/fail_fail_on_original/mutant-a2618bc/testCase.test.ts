import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';

describe('Dirty', () => {
  it('should write to disk when queue is flushed with multiple keys', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    dirty.set('key1', 'value1');
    dirty.set('key2', 'value2', () => {
      dirty.set('key3', 'value3', () => {
        dirty.on('drain', () => {
          fs.readFile(dbPath, 'utf8', (err, data) => {
            if (err) {
              done(err);
              return;
            }

            const lines = data.split('\n');
            expect(lines.length).toBeGreaterThan(3); // At least 3 lines for key1, key2, and key3, and 1 empty line
            expect(lines[0]).toContain('key1');
            expect(lines[1]).toContain('key2');
            expect(lines[2]).toContain('key3');

            fs.unlinkSync(dbPath);
            done();
          });
        });
      });
    });
  });
});