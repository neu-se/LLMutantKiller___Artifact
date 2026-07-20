import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', function () {
  it('should only emit drain when there are no in-flight writes', function (done) {
    const file = 'test.dirty';
    const db = new Dirty(file);
    db.on('load', () => {
      db.set('key', 'value');
      db.set('key2', 'value2');
      let drainCount = 0;
      db.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          db.set('key3', 'value3');
          db.on('drain', () => {
            fs.readFile(file, 'utf8', (err, data) => {
              if (err) throw err;
              const lines = data.split('\n');
              expect(lines).toHaveLength(4);
              expect(lines[0]).toBe(`${JSON.stringify({key: 'key', val: 'value'})}\n`);
              expect(lines[1]).toBe(`${JSON.stringify({key: 'key2', val: 'value2'})}\n`);
              expect(lines[2]).toBe(`${JSON.stringify({key: 'key3', val: 'value3'})}\n`);
              expect(lines[3]).toBe('');
              fs.unlinkSync(file);
              done();
            });
          });
        }
      });
    });
  });
});