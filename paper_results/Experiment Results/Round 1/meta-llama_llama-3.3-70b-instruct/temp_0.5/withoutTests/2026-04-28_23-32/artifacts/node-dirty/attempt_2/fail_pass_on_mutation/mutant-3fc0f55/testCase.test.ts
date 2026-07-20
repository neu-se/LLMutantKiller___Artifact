import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty class', () => {
  it('should emit drain event after writing to file', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      dirty.set('key', 'value');
      dirty.on('drain', () => {
        expect(fs.existsSync(dbPath)).toBe(true);
        fs.unlinkSync(dbPath);
        done();
      });
    });
  });
});