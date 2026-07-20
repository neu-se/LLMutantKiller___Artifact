import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import { join } from 'path';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should emit an error event when an empty line is encountered', (done) => {
    const dbPath = join(__dirname, 'test.db');
    const dirty = new Dirty(dbPath);

    dirty.on('error', (err) => {
      expect(err.message).toBe('Empty lines never appear in a healthy database');
      rimraf.sync(dbPath);
      done();
    });

    dirty.on('load', () => {
      fs.appendFileSync(dbPath, '\n');
    });
  });
});