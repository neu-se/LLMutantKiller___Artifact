import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should write multiple values to the database concurrently and check all values are written', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);
    const valuesToWrite = 100;

    dirty.on('load', () => {
      let count = 0;
      for (let i = 0; i < valuesToWrite; i++) {
        dirty.set(`key${i}`, `value${i}`, () => {
          count++;
          if (count === valuesToWrite) {
            dirty.close();
            fs.readFile(dbPath, 'utf8', (err, data) => {
              if (err) {
                done(err);
                return;
              }
              const lines = data.split('\n');
              expect(lines.length).toBe(valuesToWrite + 1); // valuesToWrite data lines and 1 empty line
              for (let i = 0; i < valuesToWrite; i++) {
                expect(lines[i].trim()).toBe(`{"key":"key${i}","val":"value${i}"}`);
              }
              rimraf.sync(dbPath);
              done();
            });
          }
        });
      }
    });
  });
});