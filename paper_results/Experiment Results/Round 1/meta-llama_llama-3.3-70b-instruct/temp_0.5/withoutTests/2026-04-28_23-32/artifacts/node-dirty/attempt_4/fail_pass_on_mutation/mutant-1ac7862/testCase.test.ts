import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should write multiple values to the database concurrently and check order', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      let count = 0;
      const callbacks = 10;
      for (let i = 0; i < callbacks; i++) {
        dirty.set(`key${i}`, `value${i}`, () => {
          count++;
          if (count === callbacks) {
            dirty.close();
            fs.readFile(dbPath, 'utf8', (err, data) => {
              if (err) {
                done(err);
                return;
              }
              const lines = data.split('\n');
              expect(lines.length).toBe(callbacks + 1); // callbacks data lines and 1 empty line
              for (let i = 0; i < callbacks; i++) {
                expect(lines[i].trim()).toBe(`{"key":"key${i}","val":"value${i}"}`);
              }
              // Check that all keys are written in the order they were set
              for (let i = 0; i < callbacks; i++) {
                expect(lines[i].trim().indexOf(`"key":"key${i}"`)).toBeGreaterThan(-1);
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