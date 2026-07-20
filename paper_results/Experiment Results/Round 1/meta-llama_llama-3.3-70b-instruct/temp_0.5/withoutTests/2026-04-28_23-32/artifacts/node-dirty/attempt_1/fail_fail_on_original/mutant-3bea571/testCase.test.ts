import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('Dirty', () => {
  it('should emit an error event when an empty line is encountered', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    dirty.on('error', (err) => {
      expect(err.message).toBe('Empty lines never appear in a healthy database');
      rimraf.sync(dbPath);
      done();
    });

    dirty.on('load', () => {
      fs.appendFileSync(dbPath, '\n\n');
    });
  });
});