import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';

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
        dirty.close();
        setTimeout(() => {
          if (fs.existsSync(dbPath)) {
            fs.readFile(dbPath, 'utf8', (err, data) => {
              if (err) {
                done(err);
                return;
              }

              const lines = data.split('\n');
              let foundKey1 = false;
              let foundKey2 = false;
              let foundKey3 = false;
              let foundKey4 = false;
              let foundKey5 = false;

              lines.forEach((line) => {
                if (line.includes('key1')) foundKey1 = true;
                if (line.includes('key2')) foundKey2 = true;
                if (line.includes('key3')) foundKey3 = true;
                if (line.includes('key4')) foundKey4 = true;
                if (line.includes('key5')) foundKey5 = true;
              });

              expect(foundKey1).toBe(true);
              expect(foundKey2).toBe(true);
              expect(foundKey3).toBe(true);
              expect(foundKey4).toBe(true);
              expect(foundKey5).toBe(true);

              fs.unlinkSync(dbPath);
              done();
            });
          } else {
            expect(fs.existsSync(dbPath)).toBe(true);
            done();
          }
        }, 100);
      });
    });
  }, 10000);
});