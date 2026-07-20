import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should emit an error for empty lines in the database', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);
    dirty.on('error', (err) => {
      expect(err.message).toBe('Empty lines never appear in a healthy database');
      done();
    });
    dirty.on('load', () => {
      fs.appendFile(dbPath, '\n', (err) => {
        if (err) {
          throw err;
        }
      });
    });
    dirty.on('read_close', () => {
      rimraf.sync(dbPath);
    });
  });
});