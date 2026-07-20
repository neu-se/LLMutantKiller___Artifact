import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';
import rimraf from 'rimraf';
import path from 'path';

describe('Dirty', () => {
  it('should emit an error when the database file has a corrupted row at the end', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    dirty.on('load', (size) => {
      expect(size).toBe(0);
    });

    dirty.on('error', (err) => {
      expect(err.message).toBe(`Corrupted row at the end of the db: {`);
      rimraf.sync(dbPath);
      done();
    });

    fs.appendFileSync(dbPath, '{');
  });
});